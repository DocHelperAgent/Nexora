import * as THREE from 'three';

// Basic Three.js setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Placeholder Agent (A simple robot-like figure)
const agentGroup = new THREE.Group();

// Head
const headGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const headMat = new THREE.MeshStandardMaterial({ color: 0xcccccc });
const head = new THREE.Mesh(headGeo, headMat);
head.position.y = 0.6;
agentGroup.add(head);

// Body
const bodyGeo = new THREE.BoxGeometry(0.7, 0.8, 0.5);
const bodyMat = new THREE.MeshStandardMaterial({ color: 0x888888 });
const body = new THREE.Mesh(bodyGeo, bodyMat);
agentGroup.add(body);

scene.add(agentGroup);

camera.position.z = 5;
camera.position.y = 0.5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Simple idle animation
    agentGroup.rotation.y += 0.01;
    head.rotation.x = Math.sin(Date.now() * 0.002) * 0.1;

    renderer.render(scene, camera);
}
animate();

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Chat logic
const sendBtn = document.getElementById('send-btn');
const userInput = document.getElementById('user-input');
const messagesDiv = document.getElementById('messages');

function addMessage(text, sender) {
    const msg = document.createElement('div');
    msg.className = `msg ${sender}-msg`;
    msg.innerText = `${sender === 'user' ? 'You' : 'Agent'}: ${text}`;
    messagesDiv.appendChild(msg);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleSend() {
    const text = userInput.value.trim();
    if (text) {
        addMessage(text, 'user');
        userInput.value = '';
        
        // Simple agent response logic
        setTimeout(() => {
            const responses = [
                "Hello! I am your 3D assistant.",
                "How can I help you today?",
                "That sounds interesting!",
                "I'm still learning, but I'll try my best.",
                "Three.js is amazing, isn't it?"
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, 'agent');
            
            // Make the agent "nod" or react
            head.position.y += 0.1;
            setTimeout(() => head.position.y -= 0.1, 200);
        }, 500);
    }
}

sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});
