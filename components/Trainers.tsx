"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

type Trainer = {
  name: string;
  specialty: string;
  img: string;
};

const TRAINERS: Trainer[] = [
  {
    name: "ALEX ROSS",
    specialty: "Powerlifting",
    img: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "SARA KHAN",
    specialty: "HIIT & CrossFit",
    img: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "MIKE CHEN",
    specialty: "Boxing",
    img: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&w=900&q=80",
  },
  {
    name: "LENA WOLF",
    specialty: "Yoga & Recovery",
    img: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=900&q=80",
  },
];

function TrainerCard({ trainer, index }: { trainer: Trainer; index: number }) {
  const [rotate, setRotate] = useState({ rx: 0, ry: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const x = event.clientX;
    const y = event.clientY;

    const rotateX = ((y - centerY) / rect.height) * -6;
    const rotateY = ((x - centerX) / rect.width) * 6;
    setRotate({ rx: rotateX, ry: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotate({ rx: 0, ry: 0 });
  };

  return (
    <motion.article
      className="group relative aspect-square overflow-hidden bg-card"
      initial={{ y: 40, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
    >
      <div
        data-cursor="view"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={handleMouseLeave}
        className="relative h-full w-full"
        style={{
          perspective: "800px",
          transform: `perspective(800px) rotateX(${rotate.rx}deg) rotateY(${rotate.ry}deg)`,
          transition: isHovering ? "transform 80ms linear" : "transform 0.4s ease",
        }}
      >
        <Image
          src={trainer.img}
          alt={`${trainer.name} portrait`}
          fill
          className="object-cover grayscale"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />

        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/90 to-transparent p-5 transition-transform duration-[350ms] group-hover:translate-y-0">
          <h3 className="font-display text-[24px] leading-none text-[#F5F5F5]">{trainer.name}</h3>
          <p className="mt-1 font-body text-[12px] uppercase tracking-[0.2em] text-accent">
            {trainer.specialty}
          </p>
        </div>

        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/60" />
      </div>
    </motion.article>
  );
}

export default function Trainers() {
  const headerRef = useRef<HTMLElement | null>(null);
  const isHeaderInView = useInView(headerRef, { once: true, amount: 0.2 });

  return (
    <section id="trainers" ref={headerRef} className="w-full bg-dark px-5 py-24 md:px-10 lg:px-20">
      <div className="mx-auto w-full max-w-7xl">
        <motion.p
          className="mb-3 block font-body text-xs uppercase tracking-[0.4em] text-accent"
          initial={{ opacity: 0, letterSpacing: "0.22em" }}
          animate={
            isHeaderInView
              ? { opacity: 1, letterSpacing: "0.35em" }
              : { opacity: 0, letterSpacing: "0.22em" }
          }
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          MEET THE TEAM
        </motion.p>

        <div data-cursor="text" className="overflow-hidden">
          <motion.h2
            className="mb-12 font-display text-[clamp(52px,7vw,96px)] leading-none text-white"
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={isHeaderInView ? { clipPath: "inset(0 0% 0 0)" } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            THE COACHES
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TRAINERS.map((trainer, index) => (
            <TrainerCard key={trainer.name} trainer={trainer} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
