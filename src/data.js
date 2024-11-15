export const teamData = [
    {
        "name": "Acme Product",
        "type": "Stream-Aligned",
        "size": 4,
        "interactions": [
            {
                "target": "Platform Infrastructure",
                "type": "X-as-a-Service"
            }
        ]
    },
    {
        "name": "Customer Analytics",
        "type": "Stream-Aligned",
        "size": 7,
        "interactions": [
            {
                "target": "Platform Infrastructure",
                "type": "X-as-a-Service"
            }
        ]
    },
    {
        "name": "Payments",
        "type": "Stream-Aligned",
        "size": 9,
        "interactions": [
            {
                "target": "Platform Infrastructure",
                "type": "X-as-a-Service"
            }
        ]
    },
    {
        "name": "Platform Infrastructure",
        "type": "Platform",
        "size": 10,
        "interactions": []
    },
    {
        "name": "Core Systems",
        "type": "Enabling",
        "size": 4,
        "interactions": [
            {
                "target": "Customer Analytics",
                "type": "Facilitating"
            }
        ]
    },
    {
        "name": "Video platform",
        "type": "Complicated Subsystem",
        "size": 4,
        "interactions": [
            {
                "target": "Acme Product",
                "type": "Collaborating"
            }
        ]
    }
]; 