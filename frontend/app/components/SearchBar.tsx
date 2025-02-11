"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { X } from "lucide-react"
import type React from "react"

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/?name=${searchTerm}`)
      setSearchTerm("") // Clear search after submission
    }
  }

  const toggleSearch = () => {
    setIsOpen((prev) => !prev) // Toggle search bar visibility
    if (!isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const clearSearch = () => {
    setSearchTerm("") // Clear text but keep search bar open
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        inputRef.current &&
        !inputRef.current.closest(".search-container")?.contains(event.target as Node)
      ) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative flex items-center search-container">
      <div className="flex items-center">
        <form
          className={`flex items-center justify-between gap-4 bg-gray-100 p-2 rounded-md absolute right-10 transition-all duration-300 ease-in-out overflow-hidden ${
            isOpen ? "w-80 opacity-100" : "w-0 opacity-0 pointer-events-none"
          }`}
          onSubmit={handleSearch}
        >
          <input
            ref={inputRef}
            type="text"
            name="name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for sarees"
            className="w-full bg-transparent outline-none text-sm placeholder:text-gray-400"
          />
          {searchTerm && (
            <button type="button" onClick={clearSearch} className="text-gray-400 hover:text-gray-600 flex-shrink-0">
              <X size={14} />
            </button>
          )}
        </form>
        <button
          type="button"
          onClick={toggleSearch}
          className="p-2 transition-colors duration-200 relative z-10"
        >
          <Image src="/search.png" alt="Search" width={20} height={20} priority />
        </button>
      </div>
    </div>
  )
}

export default SearchBar
