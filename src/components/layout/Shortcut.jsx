import React from 'react'
import { Link } from 'react-router-dom'
import './Shortcut.css'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'
import Result from './Result'

const Shortcut = () => {
    return (
        <div>
            <InstantSearch
                appId="DSOE9C9RBR"
                apiKey="240741f8fc28172e9a92e20eedd0633f"
                indexName="Files"
            >
                <SearchBox />
                <Hits hitComponent={Result} escapeHits={true} />
            </InstantSearch>
            <div className="ace-shortcut">
                <div className="ace-shortcut__item">Trabalhos</div>
                <div className="ace-shortcut__item">Provas</div>
                <div className="ace-shortcut__item">Artigos</div>
                <div className="ace-shortcut__item"><Link to="/upload">Contribua</Link></div>
            </div>
        </div>
            
    )
}

export default Shortcut