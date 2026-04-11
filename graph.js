const firebaseConfig = {
    apiKey: "AIzaSyDP7snJVxhiQSQs7Z8CzGA9uvk5qdLkJhQ",
    authDomain: "social-web-dev.firebaseapp.com",
    projectId: "social-web-dev",
    storageBucket: "social-web-dev.firebasestorage.app",
    messagingSenderId: "621332128804",
    appId: "1:621332128804:web:94424f8ba5b97549fbe4b1",
    measurementId: "G-S0J91M5KEQ"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const colorMap = {
    "Friend":     "blue",
    "Dating":     "red",
    "Coworker":   "orange",
    "Roommate":   "green",
    "Have Met":   "gray",
    "Secret 3rd": "purple",
    "Supervisor": "brown",
    "Teammate":   "teal"
};

const adjList={}

function bfsShortestPath(adjList, start, end) {
    //console.log(adjList)
    if (start === end) return [start];

    const queue = [start];
    const visited = new Set([start]);
    const parent = { [start]: null }; // Maps node -> its predecessor

    while (queue.length > 0) {
        const current = queue.shift();

        // If we found the destination, reconstruct the path
        if (current === end) {
            const path = [];
            let step = end;
            while (step !== null) {
                path.push(step);
                step = parent[step];
            }
            return path.reverse(); // Path from start to end
        }

        // Explore neighbors
        for (const neighbor of (adjList[current] || [])) {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                parent[neighbor] = current;
                queue.push(neighbor);
            }
        }
    }
    return null;
}

const relationFields = ["Friend", "Dating", "Coworker", "Roommate", "Have Met", "Secret 3rd", "Supervisor", "Teammate"];

async function loadGraph() {
    const snapshot = await db.collection("Local Web").get();

    const nodes = [];
    const links = [];

    snapshot.forEach(doc => {
        const data = doc.data();
        nodes.push({ id: String(data["Unique ID"]), name: data.Name });
        //console.log(nodes)
        relationFields.forEach(rel => {
            if(data[rel]){
                data[rel].forEach(targetId => {
                    links.push({ source: String(data["Unique ID"]), target: String(targetId), type: rel });
                });
            }
        });
    });
    const nodeIds = new Set(nodes.map(n => n.id));
    const arrIds = nodes.map(n => n.id);
    const filteredLinks = links.filter(l => nodeIds.has(l.source) && nodeIds.has(l.target));
    const nodeNames = nodes.map(n => n.name);

    console.log(nodeNames.length)
    for(let i = 0; i < nodeNames.length; i++){
        //console.log(nodeNames[i])
    }
    const relList = new Array()
    for(let i = 0; i < links.length -1; i++){
        //console.log(nodeNames[links[i].source - 1]+links[i].type+nodeNames[links[i].target -1])
        relList.push([nodeNames[links[i].source - 1], links[i].type, nodeNames[links[i].target -1]])
    }
    for(let i = 0; i < relList.length; i++){
        //console.log(relList[i])
    }

    for(let i = 0; i < nodeNames.length; i++){
        const adjListVal = []
        for(let j = 0; j < links.length; j++){
            //console.log(nodeNames[i] + nodeNames[links[j].source - 1])
            if(nodeNames[i] == nodeNames[links[j].source - 1]){
                //console.log(nodeNames[i] + nodeNames[links[j].target - 1])
                const human = String(nodeNames[links[j].target - 1])
                if(!adjListVal.includes(human)){
                    adjListVal.push(human)
                }
            }
        }
        const person = String(nodeNames[i])
        adjList[person] = adjListVal
    }
    //console.log(adjList)
    //console.log(nodeNames)
    //console.log(nodes)
    //console.log(links)
    let result = bfsShortestPath(adjList, 'Ellie A', 'Ellie G');
    let finalList = [];
    //console.log(result);
    for(let i=0;i<result.length - 1;i++){
        for(let j=0;j<relList.length;j++){
            if(relList[j][0] == result[i] && relList[j][2] == result[i + 1]){
                finalList.push(result[i])
                finalList.push(relList[j][1])
            }
        }
    }
    finalList.push(result[result.length - 1])
    console.log(finalList);
    drawGraph(nodes, filteredLinks);
    let finalVal = [adjList, relList];
    //console.log(finalVal)
    return finalVal;
}

// function degreesSeparation(PersonA, PersonB){
//     drawGraph().then(data => {
//         console.log(data); // This will log the actual Array(2)
//     });
//     console.log(adjList)
//     console.log('hi')
//     console.log(adjList[0])
//     console.log('hi the sequl')
//     let relList = loadGraph[1];
    
// }


function drawGraph(nodes, links) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select("#graph")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => String(d.id)).distance(120))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("stroke", d => colorMap[d.type] || "white")
        .attr("stroke-width", 2);

    const node = svg.append("g")
        .selectAll("g")
        .data(nodes)
        .enter().append("g")
        .call(d3.drag()
            .on("start", (event, d) => {
                if (!event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x; d.fy = d.y;
            })
            .on("drag", (event, d) => {
                d.fx = event.x; d.fy = event.y;
            })
            .on("end", (event, d) => {
                if (!event.active) simulation.alphaTarget(0);
                d.fx = null; d.fy = null;
            })
        );

    node.append("rect")
        .attr("width", 80)
        .attr("height", 30)
        .attr("x", -40)
        .attr("y", -15)
        .attr("rx", 6)
        .attr("fill", "#B9D0B9")
        .attr("stroke", "#FFC800")
        .attr("stroke-width", 1.5);

    node.append("text")
        .text(d => d.name)
        .attr("text-anchor", "middle")
        .attr("dy", "0.35em")
        .attr("font-size", "11px")
        .attr("fill", "#0B5710");

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
}
//const Denque = require("denque");
loadGraph();
//console.log(degreesSeparation('Ellie A', 'Ellie G'))
