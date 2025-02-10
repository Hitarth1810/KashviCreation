import { motion } from "framer-motion"

const RangoliPattern = () => {
  return (
    <svg
      className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
    >
      <motion.path
        d="M500 250C388.07 250 250 388.07 250 500C250 611.93 388.07 750 500 750C611.93 750 750 611.93 750 500C750 388.07 611.93 250 500 250ZM500 650C443.73 650 350 556.27 350 500C350 443.73 443.73 350 500 350C556.27 350 650 443.73 650 500C650 556.27 556.27 650 500 650Z"
        fill="none"
        stroke="#FFA500"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 3, ease: "easeInOut", repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />
      <motion.path
        d="M500 150C332.39 150 150 332.39 150 500C150 667.61 332.39 850 500 850C667.61 850 850 667.61 850 500C850 332.39 667.61 150 500 150ZM500 750C388.07 750 250 611.93 250 500C250 388.07 388.07 250 500 250C611.93 250 750 388.07 750 500C750 611.93 611.93 750 500 750Z"
        fill="none"
        stroke="#FFA500"
        strokeWidth="2"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 1.5,
        }}
      />
    </svg>
  )
}

export default RangoliPattern

