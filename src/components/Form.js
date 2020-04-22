import React from 'react';

const Form = ({handleSubmit, handleChange, busqueda}) => {
    return (
        <form onSubmit={handleSubmit}>
            <input type='text' name='searchText' className="input-text" value={busqueda.searchText} placeholder="Search case descriptions" onChange={handleChange} />
            <input type='date' name='dateFrom' value={busqueda.dateFrom} placeholder="From" onChange={handleChange} />
            <input type='date' name='dateTo' value={busqueda.dateTo} placeholder="To" onChange={handleChange} />
            <input type='submit' className="input-submit" value='Find case' />
        </form>
    );
}

export default Form