"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { Sparkles, Gem, Heart, Globe2, Users, Leaf } from "lucide-react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const router = useRouter()
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])

  // Main container animation for the entire page
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2, // Increased from 0.8
        delay: 0.3, // Added initial delay
        staggerChildren: 0.4 // Increased from 0.3
      }
    }
  }

  // Section animation variants - increased duration and added ease
  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1, // Increased from 0.8
        ease: "easeOut",
        delay: 0.2 // Added slight delay
      }
    }
  }

  // Card variants - increased delays between items
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: index => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7, // Increased from 0.5
        delay: 0.2 + index * 0.15 // Increased delay between items
      }
    })
  }
  return (
    <motion.div 
      ref={containerRef}
      variants={pageVariants}
      initial="hidden"
      animate="visible" 
      className="min-h-screen bg-gradient-to-b from-rose-50 to-white"
    >
      {/* Hero Section */}
      <motion.section
        variants={sectionVariants}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Hero content remains the same */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="https://images.unsplash.com/photo-1583922606661-0822ed0bd916?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Kashvi Creation Artistry"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <motion.div
            variants={sectionVariants}
            className="mb-6"
          >
            <Sparkles className="w-16 h-16 text-rose-300 mx-auto mb-4" />
          </motion.div>
          <motion.h1
            variants={sectionVariants}
            className="text-5xl md:text-7xl font-serif text-white mb-6"
          >
            Our Legacy of Beauty
          </motion.h1>
          <motion.p
            variants={sectionVariants}
            className="text-xl text-rose-100 max-w-2xl mx-auto"
          >
            Crafting timeless elegance through traditional artistry and modern innovation
          </motion.p>
        </div>

        <motion.div
          variants={sectionVariants}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white cursor-pointer"
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{
                y: [0, 12, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-1 h-3 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Vision Section */}
<motion.section
  variants={sectionVariants}
  className="py-20 px-4"
>
  <div className="max-w-7xl mx-auto">
    <motion.div
      variants={sectionVariants}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6">Our Vision</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        At Kashvi Creation, we envision a world where traditional Indian craftsmanship meets contemporary fashion. 
        Our mission is to preserve and promote the rich heritage of Indian textiles while creating modern, 
        sustainable, and elegant designs that resonate with today's fashion-conscious individuals.
      </p>
    </motion.div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          icon: <Gem className="w-8 h-8" />,
          title: "Artisanal Excellence",
          description: "Each garment is a masterpiece, handcrafted by skilled artisans with decades of experience. We combine traditional techniques with modern precision to create pieces that showcase the finest craftsmanship.",
          color: "bg-rose-50",
          iconColor: "text-rose-500",
        },
        {
          icon: <Heart className="w-8 h-8" />,
          title: "Timeless Design",
          description: "Our designs bridge the gap between heritage and contemporary fashion. We create pieces that not only capture the essence of traditional Indian aesthetics but also appeal to modern sensibilities.",
          color: "bg-amber-50",
          iconColor: "text-amber-500",
        },
        {
          icon: <Leaf className="w-8 h-8" />,
          title: "Sustainable Craft",
          description: "We're committed to ethical and sustainable practices, working directly with local artisan communities. Our eco-friendly approach ensures that every piece contributes to a better future for both craft and nature.",
          color: "bg-emerald-50",
          iconColor: "text-emerald-500",
        },
        {
          icon: <Users className="w-8 h-8" />,
          title: "Community Impact",
          description: "By empowering local artisans and preserving traditional techniques, we're building a sustainable ecosystem that benefits both creators and consumers while keeping ancient crafts alive.",
          color: "bg-blue-50",
          iconColor: "text-blue-500",
        },
        {
          icon: <Globe2 className="w-8 h-8" />,
          title: "Global Reach",
          description: "While our roots are deeply Indian, our vision is global. We bring the beauty of Indian craftsmanship to fashion enthusiasts worldwide, creating cross-cultural appreciation and understanding.",
          color: "bg-purple-50",
          iconColor: "text-purple-500",
        },
        {
          icon: <Sparkles className="w-8 h-8" />,
          title: "Innovation",
          description: "We continuously explore new techniques and technologies to enhance our craft while maintaining its authentic charm. Our innovative approach ensures that tradition evolves with time.",
          color: "bg-pink-50",
          iconColor: "text-pink-500",
        },
      ].map((item, index) => (
        <motion.div
          key={item.title}
          custom={index}
          variants={cardVariants}
          className={`${item.color} rounded-xl p-8 shadow-sm hover:shadow-xl transition-shadow duration-300`}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
          <div className={`${item.iconColor} mb-6`}>{item.icon}</div>
          <h3 className="text-2xl font-serif text-gray-900 mb-4">{item.title}</h3>
          <p className="text-gray-600">{item.description}</p>
        </motion.div>
      ))}
    </div>
  </div>
</motion.section>

      {/* Journey Section */}
      <motion.section
        variants={sectionVariants}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <motion.h2
            variants={sectionVariants}
            className="text-4xl md:text-5xl font-serif text-center text-gray-900 mb-16"
          >
            Our Journey
          </motion.h2>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-rose-200" />
            
            {[
              {
                year: "2018",
                title: "The Beginning",
                description: "Founded with a vision to revolutionize traditional saree craftsmanship",
                image: "https://images.unsplash.com/photo-1610030244570-3b6d4b7a7c0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                icon: <Globe2 className="w-6 h-6" />,
              },
              {
                year: "2020",
                title: "Digital Evolution",
                description: "Expanded our reach to global audiences through digital innovation",
                image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                icon: <Users className="w-6 h-6" />,
              },
              {
                year: "2023",
                title: "Sustainable Future",
                description: "Launched our sustainable collection supporting local artisans",
                image: "https://images.unsplash.com/photo-1590735213920-68192a57bc5c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
                icon: <Leaf className="w-6 h-6" />,
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                custom={index}
                variants={cardVariants}
                className={`relative flex items-center mb-24 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative h-64 rounded-xl overflow-hidden shadow-lg"
                  >
                    <Image
                      src={milestone.image}
                      alt={milestone.title}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
                  <motion.div
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full bg-rose-100 border-4 border-white shadow-lg flex items-center justify-center text-rose-500"
                  >
                    {milestone.icon}
                  </motion.div>
                </div>

                <div className={`w-1/2 ${index % 2 === 0 ? "pl-12" : "pr-12"}`}>
                  <span className="text-sm font-bold text-rose-500">{milestone.year}</span>
                  <h3 className="text-2xl font-serif text-gray-900 mt-2 mb-4">{milestone.title}</h3>
                  <p className="text-gray-600">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        variants={sectionVariants}
        className="py-20 bg-gradient-to-r from-rose-100 to-rose-50"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-serif text-gray-900 mb-6">Join Our Journey</h2>
          <p className="text-lg text-gray-600 mb-8">
            Experience the perfect blend of tradition and innovation with Kashvi Creation
          </p>
          <motion.button
            onClick={() => router.push('/collections')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-rose-500 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-rose-600 transition-colors duration-300"
          >
            Explore Our Collection
          </motion.button>
        </div>
      </motion.section>
    </motion.div>
  )
}