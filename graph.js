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

const relationFields = ["Friend", "Dating", "Coworker", "Roommate", "Have Met", "Secret 3rd", "Supervisor", "Teammate"];

async function loadGraph() {
    const snapshot = await db.collection("Local Web").get();

    const nodes = [];
    const links = [];

    snapshot.forEach(doc => {
        const data = doc.data();
        nodes.push({ id: data["Unique ID"], name: data.Name });
        console.log(nodes)
        relationFields.forEach(rel => {
            if(data[rel]){
                data[rel].forEach(targetId => {
                    links.push({ source: data["Unique ID"], target: targetId, type: rel });
                });
            }
        });
    });

    drawGraph(nodes, links);
}

function myFunction() {
    document.getElementById("create-login").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
    if (!event.target.matches('.drop-btn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

function drawGraph(nodes, links) {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const svg = d3.select("#graph")
        .attr("width", width)
        .attr("height", height);

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(120))
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

loadGraph();
