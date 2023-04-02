import React, { useState, useEffect } from 'react'
import '../styles/App.css';

const App = () => {
  const [category, setCategory] = useState("general");
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
   
  const handleCategory=(e)=>{
    setCategory(e.target.value);
  }

  useEffect(()=>{
   const fetchData=async()=>{
     setLoading(true);
     const response=await fetch(`https://gnews.io/api/v4/top-headlines?category=${category}&apikey=6623e4a890e07e81cca647e7bd663aae&max=10&lan=en`);
     const data=await response.json();
     setNewsData(data.articles);
     setLoading(false);
   };
      fetchData();
  },[category])


  return (
    <div id="main">
      <h1 className='heading'>Top 10 {category} news.</h1>
      <select value={category} onChange={handleCategory}>
        <option value="general" >General</option>
        <option value="business">Business</option>
        <option value="sports">Sports</option>
        <option value="technology">Technology</option>
        <option value="world">World</option>
        <option value="entertainment">Entertainment</option>
        <option value="science">Science</option>
      </select>
      {loading ?(
      <p className='loader'>Loading...</p>):(
      <ol>
        {newsData.map((articles)=>(
        <li key={articles.title}>
          <img className='news-img' src={articles.image}alt={articles.title}/>
          <section className='new-title-content-author'>
            <h3 className='news-title'>{articles.title}</h3>
            <section className='new-content-author'>
              <p className='news-description'>{articles.description}</p>
              <p className='news-source'><strong>Source:</strong>{articles.source.name}</p>
            </section>
          </section>
        </li>
        ))}
      </ol>
      )}
    </div>
  )
}


export default App;
