import React, { useState } from "react";
import "./filter.css";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface FilterProps {
    categories: [string, string, string][];
    current_filter: [string, string, string];
    onFilterChange: (filter: [string, string, string]) => void;
}

const Filter = ({ categories, current_filter, onFilterChange }: FilterProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggle = () => {
        setIsExpanded(!isExpanded);
    };

    const handleFilterClick = (filter: [string, string, string]) => {
        onFilterChange(filter);
        setIsExpanded(false);
    };

    return (
        <div className="container-filter">
            {!isExpanded ? (
                <>
                    <div className="option-filter">
                        <div className="circle-filter" style={{ backgroundColor: current_filter[2] }}></div>
                        <p className="name-option-filter">{current_filter[0]}</p>
                    </div>
                    <div className="icon-filter first-position-icon-filter" onClick={handleToggle}>
                        <KeyboardArrowDownIcon style={{ fontSize: 30, color: "#EBE5FC" }} />
                    </div>
                </>
            ) : (
                <div className="filter-options">
                    {categories.map(([filter_pt, filter_en, color], index) => (
                        <div key={index} className="option-filter new-option-filter" onClick={() => handleFilterClick([filter_pt, filter_en, color])}>
                            <div className="circle-filter" style={{ backgroundColor: color }}></div>
                            <p className="name-option-filter">{filter_pt}</p>
                        </div>
                    ))}
                    <div className="icon-filter second-position-icon-filter" onClick={handleToggle}>
                        <KeyboardArrowUpIcon style={{ fontSize: 30, color: "#EBE5FC" }} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Filter;

