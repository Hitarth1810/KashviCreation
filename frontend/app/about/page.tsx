"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const fadeInUp = {
  initial: { y: 60, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const scaleIn = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.8, ease: "easeOut" },
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#FDF8F5]">
      {/* Hero Section with enhanced parallax effect */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="relative h-[60vh] overflow-hidden"
      >
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1610030181087-540017dc9d61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
            alt="Kashvi Creation Workshop"
            width={1920}
            height={800}
            className="object-cover w-full h-full"
            priority
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 bg-black/40 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <motion.h1
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              delay: 1,
              duration: 1,
              type: "spring",
              stiffness: 100,
            }}
            className="text-4xl md:text-6xl text-white font-serif"
          >
            Our Story
          </motion.h1>
        </motion.div>
      </motion.section>

      {/* Content Sections with enhanced animations */}
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center mb-24"
        >
          <motion.div variants={fadeInUp} className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-serif text-gray-900">Heritage of Craftsmanship</h2>
            <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed">
              At Kashvi Creation, we blend centuries-old traditional craftsmanship with contemporary design
              sensibilities. Our journey began with a vision to create sarees that not only preserve our rich cultural
              heritage but also cater to the modern woman's aesthetic preferences.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-gray-600 leading-relaxed">
              Each piece in our collection is a testament to the skilled artisans who pour their heart and soul into
              creating these masterpieces, ensuring that every saree tells a unique story of tradition and elegance.
            </motion.p>
          </motion.div>
          <motion.div
            variants={scaleIn}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.4 }}
            className="relative h-[400px] rounded-lg overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1610030006409-dc8a0100e4b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=600&q=80"
              alt="Traditional Craftsmanship"
              fill
              className="object-cover"
            />
          </motion.div>
        </motion.div>

        {/* Values Section with floating animation */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 mb-24"
        >
          {[
            {
              title: "Quality",
              description:
                "We source only the finest materials and work with skilled artisans to create exceptional pieces.",
              icon: "🌟",
            },
            {
              title: "Innovation",
              description:
                "Our designs blend traditional techniques with contemporary aesthetics for the modern woman.",
              icon: "💡",
            },
            {
              title: "Sustainability",
              description: "We're committed to ethical practices and supporting local artisan communities.",
              icon: "🌿",
            },
          ].map((value) => (
            <motion.div
              key={value.title}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
              }}
              transition={{ duration: 0.3 }}
              className="p-6 bg-white rounded-lg shadow-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl mb-4"
              >
                {value.icon}
              </motion.div>
              <h3 className="text-xl font-serif text-gray-900 mb-4">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Timeline Section with enhanced animations */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative"
        >
          <motion.h2
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-serif text-gray-900 text-center mb-16"
          >
            Our Journey
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-12">
            {[
              {
                year: "2018",
                title: "The Beginning",
                description: "Kashvi Creation was founded with a vision to create exceptional designer sarees.",
                image:
                  "https://images.unsplash.com/photo-1610030244570-3b6d4b7a7c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
              {
                year: "2020",
                title: "Digital Expansion",
                description: "Launched our online presence to reach saree enthusiasts across the globe.",
                image:
                  "https://images.unsplash.com/photo-1610030244570-3b6d4b7a7c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
              {
                year: "2021",
                title: "Artisan Partnership",
                description: "Established partnerships with master craftsmen across India.",
                image:
                  "https://images.unsplash.com/photo-1610030244570-3b6d4b7a7c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
              {
                year: "2023",
                title: "Innovation Hub",
                description:
                  "Opened our design studio focusing on contemporary interpretations of traditional designs.",
                image:
                  "https://images.unsplash.com/photo-1610030244570-3b6d4b7a7c0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
              },
            ].map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  type: "spring",
                  stiffness: 50,
                  delay: index * 0.2,
                }}
                whileHover={{ scale: 1.02 }}
                className="relative pl-8 border-l border-gray-200"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                  className="absolute left-0 top-0 w-4 h-4 -ml-2 rounded-full bg-[#FDF8F5] border-2 border-gray-400"
                />
                <span className="text-sm text-gray-500">{milestone.year}</span>
                <h3 className="text-xl font-serif text-gray-900 mt-2 mb-3">{milestone.title}</h3>
                <p className="text-gray-600 mb-4">{milestone.description}</p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 + 0.7, duration: 0.5 }}
                  className="relative h-40 rounded-lg overflow-hidden shadow-md"
                >
                  <Image
                    src={milestone.image || "/placeholder.svg"}
                    alt={milestone.title}
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

