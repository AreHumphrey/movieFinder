import React, { useState, useEffect } from 'react'

interface Props {
  onSearch: (query: string) => void
}

const SearchBar: React.FC<Props> = ({ onSearch }) => {
  const [value, setValue] = useState('')
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), 500)
    return () => clearTimeout(handler)
  }, [value])

  useEffect(() => {
    onSearch(debouncedValue)
  }, [debouncedValue])

  return (
    <input
      type="text"
      placeholder="Поиск фильмов..."
      className="search-input"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default SearchBar