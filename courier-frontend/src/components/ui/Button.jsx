'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

const Button = ({
    children,
    className = '',
    magnetic = true,
    onClick,
    type = 'button',
    disabled = false,
}) => {
    const buttonRef = useRef(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springX = useSpring(x, { stiffness: 200, damping: 20 });
    const springY = useSpring(y, { stiffness: 200, damping: 20 });

    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        if (!magnetic) return;

        const handleMouseMove = (e) => {
            if (!buttonRef.current) return;

            const rect = buttonRef.current.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const deltaX = e.clientX - centerX;
            const deltaY = e.clientY - centerY;

            const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
            const magneticDistance = 120;
            const attractionStrength = 0.45;

            if (distance < magneticDistance) {
                const strength = 1 - distance / magneticDistance;
                x.set(deltaX * strength * attractionStrength);
                y.set(deltaY * strength * attractionStrength);
                setIsHovering(true);
            } else {
                x.set(0);
                y.set(0);
                setIsHovering(false);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [magnetic, x, y]);

    return (
        <motion.button
            ref={buttonRef}
            type={type}
            disabled={disabled}
            onClick={onClick}
            style={{ x: springX, y: springY }}
            className={`
        px-6 py-3 rounded-lg font-semibold
        transition-colors transition-transform
        ${isHovering ? 'bg-green-500' : 'bg-green-600'}
        text-white disabled:opacity-50 disabled:cursor-not-allowed
        ${className}
      `}
        >
            {children}
        </motion.button>
    );
};

export default Button;
