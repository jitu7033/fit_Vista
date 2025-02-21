// import React, { useEffect, useRef, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-webgl';
// import * as posedetection from '@tensorflow-models/pose-detection';

// const calculateAngle = (A, B, C) => {
//   const radians = Math.atan2(C.y - B.y, C.x - B.x) - Math.atan2(A.y - B.y, A.x - B.x);
//   let angle = Math.abs(radians * (180 / Math.PI));
//   return angle > 180 ? 360 - angle : angle;
// };

// const drawLine = (ctx, pointA, pointB, color = 'lime') => {
//   ctx.beginPath();
//   ctx.moveTo(pointA.x, pointA.y);
//   ctx.lineTo(pointB.x, pointB.y);
//   ctx.strokeStyle = color;
//   ctx.lineWidth = 3;
//   ctx.stroke();
// };

// const WorkoutTracker = () => {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [pushups, setPushups] = useState(0);
//   const [situps, setSitups] = useState(0);

//   let pushupState = 'up';  // Initial state for push-ups
//   let situpState = 'down'; // Initial state for sit-ups

//   useEffect(() => {
//     const initializeTensorFlow = async () => {
//       await tf.setBackend('webgl');
//       await tf.ready();
//       console.log('TensorFlow backend:', tf.getBackend());
//     };

//     const setupCamera = async () => {
//       const video = videoRef.current;
//       if (video) {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
//         video.srcObject = stream;
//       }
//     };

//     const runPoseDetection = async () => {
//       const detector = await posedetection.createDetector(posedetection.SupportedModels.MoveNet);
//       const ctx = canvasRef.current.getContext('2d');

//       const drawPoseLines = (pose) => {
//         const connections = [
//           ['left_shoulder', 'left_elbow'],
//           ['left_elbow', 'left_wrist'],
//           ['left_shoulder', 'left_hip'],
//           ['left_hip', 'left_knee'],
//           ['left_knee', 'left_ankle'],
//           ['right_shoulder', 'right_elbow'],
//           ['right_elbow', 'right_wrist'],
//           ['right_shoulder', 'right_hip'],
//           ['right_hip', 'right_knee'],
//           ['right_knee', 'right_ankle']
//         ];

//         connections.forEach(([partA, partB]) => {
//           const pointA = pose.keypoints.find(k => k.name === partA);
//           const pointB = pose.keypoints.find(k => k.name === partB);
//           if (pointA && pointB && pointA.score > 0.5 && pointB.score > 0.5) {
//             drawLine(ctx, pointA, pointB, 'cyan');
//           }
//         });
//       };

//       const detectPoses = async () => {
//         if (videoRef.current && videoRef.current.readyState === 4) {
//           const poses = await detector.estimatePoses(videoRef.current);
//           ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//           ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

//           poses.forEach(pose => {
//             drawPoseLines(pose);

//             const leftShoulder = pose.keypoints.find(k => k.name === 'left_shoulder');
//             const leftElbow = pose.keypoints.find(k => k.name === 'left_elbow');
//             const leftWrist = pose.keypoints.find(k => k.name === 'left_wrist');
//             const leftHip = pose.keypoints.find(k => k.name === 'left_hip');

//             // Handle Push-up counting
//             if (leftShoulder && leftElbow && leftWrist) {
//               const pushupAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);

//               // More refined thresholds with buffer zones
//               if (pushupAngle < 100 && pushupState === 'up') { // Push-up goes down
//                 pushupState = 'down';
//               } else if (pushupAngle > 160 && pushupState === 'down') { // Push-up comes up
//                 pushupState = 'up';
//                 setPushups((count) => count + 1); // Increment push-ups
//               }
//             }

//             // Handle Sit-up counting
//             if (leftShoulder && leftHip) {
//               const situpAngle = calculateAngle(leftShoulder, leftHip, { x: leftHip.x, y: leftHip.y - 1 });

//               // Adjust thresholds to track sit-ups more accurately
//               if (situpAngle < 40 && situpState === 'down') { // Sit-up goes up
//                 situpState = 'up';
//               } else if (situpAngle > 70 && situpState === 'up') { // Sit-up comes down
//                 situpState = 'down';
//                 setSitups((count) => count + 1); // Increment sit-ups
//               }
//             }
//           });
//         }
//         requestAnimationFrame(detectPoses);
//       };

//       detectPoses();
//     };

//     const startApp = async () => {
//       await initializeTensorFlow();
//       await setupCamera();
//       runPoseDetection();
//     };

//     startApp();
//   }, []);

//   return (
//     <div className="flex flex-col items-center justify-center">
//       <video ref={videoRef} className="hidden" autoPlay playsInline />
//       <canvas ref={canvasRef} className="w-full max-w-xl" width="640" height="480" />
//       <div className="mt-4 text-xl">
//         <p>Push-ups: {pushups}</p>
//         <p>Sit-ups: {situps}</p>
//       </div>
//     </div>
//   );
// };

// export default WorkoutTracker;



// import React, { useEffect, useRef, useState } from 'react';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-backend-webgl';
// import * as posedetection from '@tensorflow-models/pose-detection';
// import io from 'socket.io-client';
// import { drawKeypoints, drawSkeleton } from './poseUtils';

// const socket = io('http://localhost:5000');

// export default function FlexItOutPlatform() {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [pushupCount, setPushupCount] = useState(0);
//   const [previousPosition, setPreviousPosition] = useState('up');
//   const [leaderboard, setLeaderboard] = useState([]);

//   useEffect(() => {
//     initializeModel().then(startCamera);
//     socket.on('leaderboardUpdate', setLeaderboard);
//   }, []);

//   const initializeModel = async () => {
//     await tf.ready();
//     await tf.setBackend('webgl');
//   };

//   const startCamera = async () => {
//     const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//     videoRef.current.srcObject = stream;
//     const detector = await posedetection.createDetector(posedetection.SupportedModels.MoveNet);
//     trackPushups(detector);
//   };

//   const trackPushups = (detector) => {
//     const ctx = canvasRef.current.getContext('2d');

//     setInterval(async () => {
//       const poses = await detector.estimatePoses(videoRef.current);
//       ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
//       if (poses.length > 0) {
//         drawKeypoints(poses[0].keypoints, ctx);
//         drawSkeleton(poses[0].keypoints, ctx);
//         const nose = poses[0].keypoints.find(point => point.name === 'nose');

//         if (nose && nose.y !== undefined) {
//           if (nose.y > 300 && previousPosition === 'up') {
//             setPreviousPosition('down');
//           } else if (nose.y < 200 && previousPosition === 'down') {
//             setPreviousPosition('up');
//             setPushupCount(count => count + 1);
//             socket.emit('updateScore', { username: 'User1', score: pushupCount + 1 });
//           }
//         }
//       }
//     }, 100);
//   };

//   return (
//     <div className="p-4">
//       <video ref={videoRef} autoPlay playsInline className="rounded-xl w-full" />
//       <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
//       <h2 className="text-xl font-bold mt-4">Push-up Count: {pushupCount}</h2>
//       <h3 className="text-lg font-bold mt-2">Leaderboard:</h3>
//       <ul>{leaderboard.map((p, i) => (<li key={i}>{p.username}: {p.score}</li>))}</ul>
//     </div>
//   );
// }
