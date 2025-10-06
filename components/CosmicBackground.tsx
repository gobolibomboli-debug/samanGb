import React, { useRef, useEffect } from 'react';

const CosmicBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameId = useRef<number | null>(null);
    const particles = useRef<any[]>([]);
    const mouse = useRef<{ x: number, y: number }>({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
    const containerRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            
            const particleCount = Math.floor((canvas.width * canvas.height) / 20000);
            particles.current = [];
            const colors = [
                'rgba(125, 211, 252, 0.6)', // sky-300
                'rgba(14, 165, 233, 0.6)',  // sky-500
                'rgba(168, 85, 247, 0.4)',  // purple-500
                'rgba(240, 249, 255, 0.7)'  // sky-50
            ];
            for (let i = 0; i < particleCount; i++) {
                const radius = Math.random() * 2.5 + 1;
                particles.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: radius,
                    baseRadius: radius,
                    vx: Math.random() * 0.2 - 0.1,
                    vy: Math.random() * 0.2 - 0.1,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    angle: Math.random() * Math.PI * 2,
                    speed: Math.random() * 0.005 + 0.001
                });
            }
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
        };
        
        const animate = () => {
            if (!ctx || !canvas) return;
            
            // Parallax effect for the entire canvas
            const targetX = (mouse.current.x - canvas.width / 2) * -0.01;
            const targetY = (mouse.current.y - canvas.height / 2) * -0.01;
            containerRef.current.x += (targetX - containerRef.current.x) * 0.05;
            containerRef.current.y += (targetY - containerRef.current.y) * 0.05;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.translate(containerRef.current.x, containerRef.current.y);

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            particles.current.forEach(p => {
                // Slow swirling motion
                p.angle += p.speed;
                p.x += Math.cos(p.angle) * 0.1 + p.vx;
                p.y += Math.sin(p.angle) * 0.1 + p.vy;
                
                // Boundary check (wrapping)
                if (p.x < -p.radius) p.x = canvas.width + p.radius;
                if (p.x > canvas.width + p.radius) p.x = -p.radius;
                if (p.y < -p.radius) p.y = canvas.height + p.radius;
                if (p.y > canvas.height + p.radius) p.y = -p.radius;

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            });
            ctx.restore();

            animationFrameId.current = requestAnimationFrame(animate);
        };
        
        resizeCanvas();
        animate();
        
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            if (animationFrameId.current) {
                cancelAnimationFrame(animationFrameId.current);
            }
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return <canvas ref={canvasRef} id="cosmic-background-canvas" />;
};

export default CosmicBackground;