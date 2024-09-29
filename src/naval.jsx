import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { IoArrowUpOutline } from "react-icons/io5";
import { marked } from "marked";

const pathVariants = {
    hidden: {
        pathLength: 0,
    },
    fast: {
        pathLength: 1,
        transition: {
            duration: 0.5,
            ease: "easeInOut",
        },
    },
    visibleFast: {
        pathLength: 1,
        transition: {
            duration: 1.7,
            ease: "easeInOut",
        },
    },
    visibleFaster: {
        pathLength: 1,
        transition: {
            duration: 0.7,
        },
    },
};

const textboxVariants = {
    hidden: {
        opacity: 0,
        y: 100,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1.7,
            ease: "easeInOut",
        },
    },
};

const loadingVariants = {
    start: { rotate: 0 },
    end: {
        rotate: 360,
        transition: { duration: 1, repeat: Infinity, ease: "linear" },
    },
};

export function Hero() {
    const [inputValue, setInputValue] = useState('');
    const [loading, setLoading] = useState(false);
    const [output, setOutput] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleSendClick = async () => {
        if (inputValue.trim() === '') return;

        setLoading(true);
        setOutput('');
        const prompt =
            "Respond as if you are Naval Ravikant, the iconoclastic philosopher, investor, and entrepreneur. Channel his deep insights on happiness, wealth, knowledge, mindfulness, and living a purposeful life. Draw from his essays, interviews, and tweets to provide perspective in his distinctively profound yet practical style. Avoid directly quoting verbatim, but capture the essence of his timeless wisdom with your own unique phrasing. " +
            "Here's my question: " +
            inputValue;

        try {
            const response = await fetch('https://0x1a41767613ab2e34ce3db03917e48af0ea2b9903.us.gaianet.network/v1/chat/completions', {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [
                        { role: "system", content: "You are a helpful assistant." },
                        { role: "user", content: prompt },
                    ],
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch response');
            }

            const data = await response.json();
            const generatedText = data.choices[0].message.content;
            setOutput(marked.parse(generatedText));
        } catch (error) {
            console.error('Error:', error);
            setOutput('An error occurred while fetching the response.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center m-10 font-jetbrains-mono">
            <motion.svg
                className="w-60 h-60 drop-shadow-2xl m-10"
                width="462"
                height="672"
                viewBox="0 0 462 672"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Shakal support horizontal */}
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="visibleFaster"
                    d="M2.5 281.5C86 265 294.4 241.9 460 281.5"
                    stroke="rgb(163 163 163)"
                    strokeWidth="16"
                />
                {/* Shakal ke beech ka */}
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="visibleFaster"
                    d="M234 0.5C233.2 521.7 233.667 665 234 671.5"
                    stroke="rgb(163 163 163)"
                    strokeWidth="16"
                />
                {/* Facestruct */}
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="visibleFast"
                    d="M47.5 77.5V477L173 600.5H293L420.5 477V77.5"
                    stroke="black"
                    strokeWidth="16"
                />
                {/* Neck */}
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="visibleFast"
                    d="M96 653.5V525.5"
                    stroke="black"
                    strokeWidth="16"
                />
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="visibleFast"
                    d="M368 654V526"
                    stroke="black"
                    strokeWidth="16"
                />
                {/* Mouth */}
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="fast"
                    d="M175.5 473.5C198 469.667 252.7 464.3 291.5 473.5"
                    stroke="black"
                    strokeWidth="16"
                />
                {/* Chin */}
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="fast"
                    d="M263 518.5H207.5"
                    stroke="black"
                    strokeWidth="16"
                />
                {/* Nose */}
                <motion.path
                    variants={pathVariants}
                    initial="hidden"
                    animate="fast"
                    d="M207.5 419.5H263"
                    stroke="black"
                    strokeWidth="16"
                />
            </motion.svg>
            <div className="relative w-full max-w-md">
                <motion.textarea
                    variants={textboxVariants}
                    initial="hidden"
                    animate="visible"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="seek wisdom here"
                    rows={1}
                    className="w-full text-center my-2 px-16 py-2 resize-vertical bg-neutral-700 rounded-[35px] shadow-2xl text-white"
                    disabled={loading}
                />
                {inputValue.trim() !== '' && !loading && (
                    <motion.button
                        onClick={handleSendClick}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded-md flex items-center justify-center"
                    >
                        <IoArrowUpOutline className="mr-1 text-gray-800" />
                    </motion.button>
                )}
            </div>

            {loading && (
                <motion.div
                    className="mt-4 w-8 h-8 border-t-2 border-b-2 border-gray-900 rounded-full"
                    variants={loadingVariants}
                    animate="end"
                    initial="start"
                />
            )}

            {output && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="my-6 max-w-3xl prose prose-invert"
                    dangerouslySetInnerHTML={{ __html: output }}
                />
            )}
        </div>
    );
}
