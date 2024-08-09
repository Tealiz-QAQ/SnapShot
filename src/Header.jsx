import React, {useState} from "react";
function Header({ category, setCategory, images }){
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResult, setSearchResult] = useState(category);

    const handleSearch = () => {
      // Tìm kiếm từ khóa trong các key của đối tượng images
      if (images[searchTerm]) {
        setCategory(searchTerm);
        setSearchResult(searchTerm);
      } else {
        setSearchResult(null);
      }
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setSearchResult(newCategory);
    };

    return(
        <header>
            <h1>SnapShot</h1>
            <div className="search-contain">
                <input type="text" placeholder="Search..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
                <button type="submit" onClick={handleSearch}>
                    <svg height="32" width="32">
                        <path   d="M19.427 21.427a8.5 8.5 0 1 1 2-2l5.585 5.585c.55.55.546 1.43 0 1.976l-.024.024a1.399 1.399 0 0 1-1.976 0l-5.585-5.585zM14.5 21a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"
                                fill="#FFFFFF"
                                fillRule="evenodd"/>
                    </svg>
                </button>
            </div>
            <nav>
                <button onClick={() => handleCategoryChange('Mountain')}>Mountain</button>
                <button onClick={() => handleCategoryChange('Beaches')}>Beaches</button>
                <button onClick={() => handleCategoryChange('Birds')}>Birds</button>
                <button onClick={() => handleCategoryChange('Foods')}>Foods</button>
            </nav>
            <main>
                <h2>{searchResult ? `${searchResult} Pictures` : "No Images Found"}</h2>
                {searchResult && (
                    <div className="gallery"> {images[category].map((src, index) => (<img key={index} src={src} alt={`${category} ${index + 1}`} />))}</div>
                )}
            </main>
        </header>
    );
}

export default Header;