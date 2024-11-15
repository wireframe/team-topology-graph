import './style.css'
import Graph from 'graphology';
import Sigma from 'sigma';
import forceAtlas2 from 'graphology-layout-forceatlas2';
import { teamData } from './data';

function createVisualization() {
    const container = document.getElementById('topology-container');
    if (!container) {
        console.error('Container not found!');
        return;
    }

    // Create a new graph instance
    const graph = new Graph();

    // Helper function to get node colors
    function getColorByType(type) {
        const colors = {
            'Stream-Aligned': '#1f77b4',
            'Platform': '#ff7f0e',
            'Enabling': '#2ca02c',
            'Complicated Subsystem': '#d62728'
        };
        return colors[type] || '#999';
    }

    // Helper function to get edge colors by interaction type
    function getEdgeColorByType(type) {
        const colors = {
            'X-as-a-Service': '#ff7f0e',
            'Facilitating': '#2ca02c',
            'Collaborating': '#1f77b4'
        };
        return colors[type] || '#999';
    }

    // Add nodes to the graph
    teamData.forEach(team => {
        graph.addNode(team.name, {
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: team.size * 3,
            label: team.name,
            color: getColorByType(team.type),
            teamType: team.type
        });
    });

    // Add edges based on interactions
    teamData.forEach(team => {
        team.interactions.forEach(interaction => {
            graph.addEdge(team.name, interaction.target, {
                size: 4,
                label: interaction.type,
                color: getEdgeColorByType(interaction.type),
                type: 'arrow',
                forceLabel: true,
            });
        });
    });

    // Apply ForceAtlas2 layout
    forceAtlas2.assign(graph, {
        iterations: 50,
        settings: {
            gravity: 1,
            scalingRatio: 2,
            strongGravityMode: true,
            slowDown: 10
        }
    });

    try {
        // Create the renderer with settings
        const renderer = new Sigma(graph, container, {
            defaultNodeType: "circle",
            defaultEdgeType: "arrow",
            renderLabels: true,
            renderEdgeLabels: true,
            labelSize: 14,
            labelWeight: "bold",
            minCameraRatio: 0.1,
            maxCameraRatio: 10,
            minArrowSize: 8,
            maxArrowSize: 12,
            edgeArrowSize: 12,
            edgeLineWidth: 4,
            edgeLabelSize: 12,
            nodeReducer: (node, data) => ({
                ...data,
                highlighted: data.highlighted || false,
                type: "circle"
            })
        });

        // Add hover effects
        let hoveredNode = null;

        renderer.on('enterNode', ({ node }) => {
            hoveredNode = node;
            const neighbors = graph.neighbors(node);
            graph.setNodeAttribute(node, 'highlighted', true);
            neighbors.forEach(neighbor => {
                graph.setNodeAttribute(neighbor, 'highlighted', true);
            });
            renderer.refresh();
        });

        renderer.on('leaveNode', ({ node }) => {
            hoveredNode = null;
            graph.forEachNode(node => {
                graph.setNodeAttribute(node, 'highlighted', false);
            });
            renderer.refresh();
        });

        // Add camera controls
        renderer.on('clickStage', ({ event }) => {
            if (!hoveredNode) {
                renderer.getCamera().animatedReset();
            }
        });

        // Add legend
        const legend = document.createElement('div');
        legend.style.position = 'absolute';
        legend.style.top = '10px';
        legend.style.right = '10px';
        legend.style.background = 'white';
        legend.style.padding = '10px';
        legend.style.borderRadius = '5px';
        legend.style.boxShadow = '0 0 10px rgba(0,0,0,0.1)';

        const teamTypes = ['Stream-Aligned', 'Platform', 'Enabling', 'Complicated Subsystem'];
        teamTypes.forEach(type => {
            const item = document.createElement('div');
            item.style.marginBottom = '5px';
            const color = getColorByType(type);
            item.innerHTML = `
                <span style="display: inline-block; width: 20px; height: 20px; background: ${color}; border-radius: 50%; margin-right: 8px; vertical-align: middle;"></span>
                <span style="vertical-align: middle;">${type}</span>
            `;
            legend.appendChild(item);
        });

        container.appendChild(legend);
    } catch (error) {
        console.error('Error creating Sigma instance:', error);
    }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createVisualization);
} else {
    createVisualization();
} 