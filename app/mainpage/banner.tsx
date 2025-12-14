'use client'

import { motion } from 'framer-motion';

export default function HeroBanner() {
 
  const beanSizes = [40, 40, 34]; 


  const random = (min: number, max: number) => Math.random() * (max - min) + min;

  
  const coffeeBeans = Array.from({ length: 30 }, (_, i) => ({
    size: beanSizes[Math.floor(Math.random() * beanSizes.length)],
    top: random(5, 60), // درصد ارتفاع رندوم
    left: random(10, 90), // درصد عرض رندوم
    duration: random(5, 8), // مدت انیمیشن رندوم
    rotate: random(-15, 15), // مقدار چرخش رندوم
  }));

  return (
    <div className="relative w-full h-[65vh] rounded-2xl  bg-gradient-to-br from-[#CFA67A] via-[#F3D5A0] to-[#FFF5E6] overflow-hidden flex items-center justify-center">

      {/* Floating Coffee Beans */}
      {coffeeBeans.map((bean, i) => (
        <motion.img
          key={i}
          src="/coffee.png"
          className={`absolute opacity-80`}
          style={{ width: `${bean.size}px`, top: `${bean.top}vh`, left: `${bean.left}vw` }}
          animate={{
            y: [0, -20 - (bean.size / 2), 0],
            rotate: [0, bean.rotate, -bean.rotate, 0]
          }}
          transition={{ repeat: Infinity, duration: bean.duration, ease: "easeInOut" }}
        />
      ))}

      {/* Text Content */}
      <motion.div 
        className="text-center z-10 px-4"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#4B2E19] drop-shadow-md mb-4 font-serif">
          جوجو کافی شاپ
        </h1>
        <p className="text-xl md:text-2xl text-[#5C3A21] mb-6 drop-shadow-sm font-medium">
        یک جرعه آرامش در هر فنجان
        </p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          className="px-8 py-3 bg-[#A87C4D] text-white font-semibold rounded-lg shadow-lg drop-shadow-md"
        >
          مشاهده محصولات
        </motion.button>
      </motion.div>

      
      <motion.img
        src="/wave.png"
        className="absolute bottom-0 mr-0 w-full h-80"
        alt="wave"
        animate={{
          y: [20, 0, 20],
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
      />
    </div>
  )
}
