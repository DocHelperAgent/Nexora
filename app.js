
if (typeof window !== 'undefined' && window.__nexora_initialized) {
    console.log('Nexora already initialized — skipping duplicate app.js load.');
} else {
    if (typeof window !== 'undefined') window.__nexora_initialized = true;

    if (typeof THREE === 'undefined') {
        console.error('THREE is not defined. Ensure three.js is loaded before app.js');
    } else {

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.COLORS.BACKGROUND);
scene.fog = new THREE.Fog(CONFIG.COLORS.BACKGROUND, 2, 20);

// Environment: Futuristic Office Elements
function createEnvironment() {
    // Floor
    const floorGeom = new THREE.PlaneGeometry(50, 50);
    const floorMat = new THREE.MeshStandardMaterial({
        color: 0x1a1a2e,
        roughness: 0.2,
        metalness: 0.1
    });
    const floor = new THREE.Mesh(floorGeom, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.5;
    scene.add(floor);

    // Glowing Grid
    const grid = new THREE.GridHelper(50, 50, 0x00ffff, 0x002222);
    grid.position.y = -2.49;
    scene.add(grid);

    // Pillars
    const pillarGeom = new THREE.BoxGeometry(1, 10, 1);
    const pillarMat = new THREE.MeshStandardMaterial({ color: 0x2c3e50 });
    for (let i = 0; i < 4; i++) {
        const pillar = new THREE.Mesh(pillarGeom, pillarMat);
        pillar.position.set(i % 2 ? 10 : -10, 2.5, i < 2 ? -10 : 10);
        scene.add(pillar);
    }

    // Desk Surface
    const deskGeom = new THREE.BoxGeometry(6, 0.2, 3);
    const deskMat = new THREE.MeshStandardMaterial({ color: 0x1e1e2e, emissive: 0x00ffff, emissiveIntensity: 0.05 });
    const desk = new THREE.Mesh(deskGeom, deskMat);
    desk.position.set(0, -1.2, 1);
    scene.add(desk);

    // Floating Data Panels
    for (let i = 0; i < 12; i++) {
        const panelGeom = new THREE.PlaneGeometry(1.2, 0.8);
        const panelMat = new THREE.MeshBasicMaterial({
            color: 0x00ffff,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const panel = new THREE.Mesh(panelGeom, panelMat);
        panel.position.set(
            (Math.random() - 0.5) * 20,
            Math.random() * 6,
            (Math.random() - 0.5) * 15 - 5
        );
        panel.rotation.y = Math.random() * Math.PI;
        scene.add(panel);
    }
}
createEnvironment();

// Holographic Ring
const ringGeom = new THREE.TorusGeometry(2.5, 0.03, 16, 100);
const ringMat = new THREE.MeshBasicMaterial({ color: 0x00ffff, transparent: true, opacity: 0.2 });
const ring = new THREE.Mesh(ringGeom, ringMat);
ring.rotation.x = Math.PI / 2;
ring.position.y = -0.5;
scene.add(ring);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 0.5, 6);

const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.getElementById('threejs-container').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0x00ffff, 2, 20);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

const whiteLight = new THREE.DirectionalLight(0xffffff, 0.8);
whiteLight.position.set(-5, 8, 5);
scene.add(whiteLight);

// 3D Agent Model (Nexora Style)
const agentGroup = new THREE.Group();

const armorMat = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5, roughness: 0.2 });
const visorMat = new THREE.MeshStandardMaterial({ color: 0x000000, roughness: 0.05 });
const glowMat = new THREE.MeshStandardMaterial({ color: 0x00ffff, emissive: 0x00ffff, emissiveIntensity: 1.5 });
const darkMetalMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.7, roughness: 0.3 });

// Helmet
const helmetGeom = new THREE.SphereGeometry(1, 32, 32);
helmetGeom.scale(1, 1.1, 0.9);
const helmet = new THREE.Mesh(helmetGeom, armorMat);
agentGroup.add(helmet);

// Visor
const visorGeom = new THREE.SphereGeometry(0.92, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.55);
visorGeom.scale(1, 0.85, 1.05);
const visor = new THREE.Mesh(visorGeom, visorMat);
visor.position.z = 0.05;
visor.rotation.x = -0.15;
helmet.add(visor);

// Eyes
const eyeGeom = new THREE.SphereGeometry(0.08, 16, 16);
const leftEye = new THREE.Mesh(eyeGeom, glowMat);
leftEye.scale.set(1, 0.5, 1);
leftEye.position.set(-0.35, 0.15, 0.85);
helmet.add(leftEye);

const rightEye = new THREE.Mesh(eyeGeom, glowMat);
rightEye.scale.set(1, 0.5, 1);
rightEye.position.set(0.35, 0.15, 0.85);
helmet.add(rightEye);

// Ear Discs
const discGeom = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 32);
const leftDisc = new THREE.Mesh(discGeom, armorMat);
leftDisc.rotation.z = Math.PI / 2;
leftDisc.position.set(-1, 0, 0);
helmet.add(leftDisc);

const rightDisc = new THREE.Mesh(discGeom, armorMat);
rightDisc.rotation.z = Math.PI / 2;
rightDisc.position.set(1, 0, 0);
helmet.add(rightDisc);

const ringInnerGeom = new THREE.TorusGeometry(0.2, 0.03, 8, 32);
const leftRing = new THREE.Mesh(ringInnerGeom, glowMat);
leftRing.position.set(-1.1, 0, 0);
leftRing.rotation.y = Math.PI / 2;
helmet.add(leftRing);

const rightRing = new THREE.Mesh(ringInnerGeom, glowMat);
rightRing.position.set(1.1, 0, 0);
rightRing.rotation.y = Math.PI / 2;
helmet.add(rightRing);

// Body
const neckGeom = new THREE.CylinderGeometry(0.25, 0.35, 0.5, 16);
const neck = new THREE.Mesh(neckGeom, darkMetalMat);
neck.position.y = -1.1;
agentGroup.add(neck);

const torsoGeom = new THREE.CylinderGeometry(0.7, 0.7, 1.2, 16);
const torso = new THREE.Mesh(torsoGeom, armorMat);
torso.position.y = -2.2;
agentGroup.add(torso);

const chestLightGeom = new THREE.TorusGeometry(0.2, 0.06, 8, 3);
const chestLight = new THREE.Mesh(chestLightGeom, glowMat);
chestLight.position.set(0, -1.8, 0.6);
chestLight.rotation.z = Math.PI;
agentGroup.add(chestLight);

scene.add(agentGroup);

// Animation & Interaction variables
let talking = false;
let mouseX = 0;
let mouseY = 0;
let targetRotationX = 0;
let targetRotationY = 0;

// Mouse movement listener
window.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) - 0.5;
    mouseY = (event.clientY / window.innerHeight) - 0.5;
});

// Audio & AI Logic
const ttsAudio = new Audio();
const messagesDiv = document.getElementById('messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const micBtn = document.getElementById('mic-btn');
const statusText = document.getElementById('status-text');
const resetBtn = document.getElementById('reset-btn');
let isRequestInFlight = false;

function setStatus(message, type = '') {
    statusText.textContent = message;
    statusText.className = type;
}

function resetChat() {
    messagesDiv.innerHTML = '';
    chatInput.value = '';
    setStatus('Ready');
    chatInput.focus();
}

function speakText(text) {
    const apiUrl = `${CONFIG.TTS_API_URL}?text=${encodeURIComponent(text)}&voice=${encodeURIComponent(CONFIG.VOICE_NAME)}`;
    ttsAudio.src = apiUrl;
    ttsAudio.playbackRate = CONFIG.SPEECH_SPEED;
    ttsAudio.play().catch(e => console.warn("Audio playback delayed until user interaction"));

    talking = true;
    ttsAudio.onended = () => {
        talking = false;
        helmet.rotation.x = 0;
        leftEye.scale.y = 1;
        rightEye.scale.y = 1;
    };
}

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    const recognition = new SpeechRecognition();
    let isRecording = false;

    recognition.onstart = () => {
        isRecording = true;
        micBtn.classList.add('recording');
        micBtn.textContent = '🛑';
    };
    recognition.onend = () => {
        isRecording = false;
        micBtn.classList.remove('recording');
        micBtn.textContent = '🎤';
    };
    recognition.onresult = (e) => handleSend(e.results[0][0].transcript);

    micBtn.addEventListener('click', () => {
        if (isRecording) {
            recognition.stop();
        } else {
            recognition.start();
        }
    });
}

function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}-msg`;
    msgDiv.textContent = (sender === 'agent' ? `${CONFIG.AGENT_NAME}: ` : 'You: ') + text;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function extractReply(payload) {
    if (payload == null) return '';
    if (typeof payload === 'string') return payload.trim();
    if (Array.isArray(payload)) {
        for (const item of payload) {
            const text = extractReply(item);
            if (text) return text;
        }
        return '';
    }
    if (typeof payload === 'object') {
        const preferredKeys = ['reply', 'text', 'message', 'output', 'body', 'response', 'result', 'answer'];
        for (const key of preferredKeys) {
            if (key in payload) {
                const text = extractReply(payload[key]);
                if (text) return text;
            }
        }
        for (const value of Object.values(payload)) {
            const text = extractReply(value);
            if (text) return text;
        }
    }
    return '';
}

async function getAIResponse(userText) {
    if (isRequestInFlight) {
        return `Please wait while ${CONFIG.AGENT_NAME} finishes the current response.`;
    }

    isRequestInFlight = true;
    setStatus(`${CONFIG.AGENT_NAME} is thinking...`, 'loading');
    sendBtn.disabled = true;
    chatInput.disabled = true;

    addMessage(CONFIG.THINKING_TEXT, 'agent');
    const thinkingMsg = messagesDiv.lastElementChild;
    try {
        const res = await fetch(CONFIG.AI_API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: userText })
        });

        let data;
        try {
            data = await res.json();
        } catch (jsonError) {
            const text = await res.text();
            console.error('Non-JSON AI response:', text);
            throw new Error('Invalid JSON response from AI service.');
        }

        console.groupCollapsed('AI raw response');
        console.log(data);
        console.groupEnd();

        thinkingMsg.remove();
        const reply = extractReply(data);

        setStatus('Ready');
        return reply || 'I could not parse the response from the AI service.';
    } catch (e) {
        console.error('AI request failed', e);
        if (thinkingMsg) {
            thinkingMsg.remove();
        }
        setStatus('AI service unavailable', 'error');
        return 'Sorry, I could not reach the AI service. Please check your webhook and try again.';
    } finally {
        isRequestInFlight = false;
        sendBtn.disabled = false;
        chatInput.disabled = false;
    }
}

async function handleSend(forcedText = null) {
    const text = forcedText || chatInput.value.trim();
    if (!text || isRequestInFlight) return;

    addMessage(text, 'user');
    if (!forcedText) chatInput.value = '';

    const reply = await getAIResponse(text);
    addMessage(reply, 'agent');
    await new Promise(resolve => setTimeout(resolve, 150));
    speakText(reply);
}

sendBtn.addEventListener('click', () => handleSend());
resetBtn.addEventListener('click', resetChat);
chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        handleSend();
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        chatInput.value = '';
        setStatus('Input cleared.');
    }
});

// Animation Loop
function animate() {
    window.__nexora_animFrame = requestAnimationFrame(animate);
    const time = Date.now() * 0.002;

    // Agent bobbing
    agentGroup.position.y = Math.sin(time) * 0.15;

    // Head tracking (Smooth follow mouse)
    targetRotationY = mouseX * 0.5;
    targetRotationX = mouseY * 0.3;
    helmet.rotation.y += (targetRotationY - helmet.rotation.y) * 0.1;
    helmet.rotation.x += (targetRotationX - helmet.rotation.x) * 0.1;

    // Ring animation
    ring.rotation.z = time * 0.3;
    ring.position.y = Math.sin(time * 0.5) * 0.1 - 0.8;

    // Random Blinking
    if (!talking && Math.random() < 0.01) {
        leftEye.scale.y = 0.1;
        rightEye.scale.y = 0.1;
        setTimeout(() => {
            leftEye.scale.y = 0.5; // Reset to user's 0.5 scale
            rightEye.scale.y = 0.5;
        }, 150);
    }

    if (talking) {
        // Intensive pulse while speaking
        glowMat.emissiveIntensity = 2 + Math.sin(Date.now() * 0.02) * 1;

        // Emotive "speech" head tilt (adds to mouse tracking)
        helmet.rotation.z = Math.sin(time * 8) * 0.02;

        const s = 0.4 + Math.abs(Math.sin(time * 12)) * 0.6;
        leftEye.scale.y = s * 0.5; // Apply speech squint to user's base scale
        rightEye.scale.y = s * 0.5;
    } else {
        // Gentle idle pulse
        glowMat.emissiveIntensity = 1 + Math.sin(time) * 0.3;
    }

    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

console.log("3D Scene Initialized Successfully");
animate();

// Cleanup handler to clear animation frame and allow re-initialization if needed
window.addEventListener('unload', () => {
    try {
        if (window.__nexora_animFrame) cancelAnimationFrame(window.__nexora_animFrame);
    } catch (e) { }
    try { window.__nexora_initialized = false; } catch (e) { }
});

    }
}
