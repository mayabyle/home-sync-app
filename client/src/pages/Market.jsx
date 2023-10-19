import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function Market() {
    const [items, setItems] = useState([]);	
    const [inputValue, setInputValue] = useState('');

    const handleAddButtonClick = async () => {
		const newItem = {
			name: inputValue,
			quantity: 1,
			isSelected: 0,
		};
		
		try {
			await axios.post(`/market`, {name: inputValue})
			const newItems = [...items, newItem];
			setItems(newItems);
		} catch(e) { 
			console.log(e)
			alert(`Oops.. You already added ${inputValue} to your shopping list`);
		}

		setInputValue('');
	};

    const handleKeyDown = (e) => {
        if (e.key.toLowerCase() === "enter" && inputValue.trim() !== '') {
            handleAddButtonClick();
        }
    }

    const handleQuantityIncrease = async (index) => {
		const newItems = [...items];
		try {
			const newQuan = newItems[index].quantity + 1
			await axios.put(`/market/${newItems[index].name}`, {quantity: newQuan})
			newItems[index].quantity++
			setItems(newItems);
		} catch(e) { console.log(e) }
	};

	const handleQuantityDecrease = async (index) => {
		const newItems = [...items];
		try {
			const newQuan = newItems[index].quantity - 1
			await axios.put(`/market/${newItems[index].name}`, {quantity: newQuan})
			newItems[index].quantity--
			setItems(newItems);
		} catch(e) { console.log(e) }
	};

    const toggleComplete = (index) => {
		const newItems = [...items];
		newItems[index].isSelected = 1-newItems[index].isSelected;
		setItems(newItems);
	};

    useEffect(() => {
		const fetchItems = async () => {
            try {
                const res = await axios.get(`/market`)
                setItems(res.data)
            } 
            catch(err) { console.log(err) }
        }
        fetchItems()
    }, [])


    return (
		<div className='market'>
			<div className='add-item-box'>
				<input value={inputValue} 
                    onChange={(event) => setInputValue(event.target.value)} 
                    onKeyDown={handleKeyDown}
                    className='add-item-input' 
                    placeholder='Add an item...' />
				<FontAwesomeIcon icon={faPlus} onClick={() => handleAddButtonClick()} />
			</div>
			<div className='shopping-list'>
				{items.map((item, index) => (
					<div className='item' key={index}>
						<div className='item-name' onClick={() => toggleComplete(index)}>
							{item.isSelected===1 ? (
								<>
									<FontAwesomeIcon icon={faCheckCircle} size="xs" color="#b9e7e7" style={{paddingRight: '15px'}}/>
									<span className='completed'>{item.name}</span>
								</>
							) : (
								<>
									<FontAwesomeIcon icon={faCircle} size="xs" color="#b9e7e7" style={{paddingRight: '15px'}}/>
									<span>{item.name}</span>
								</>
							)}
						</div>
                        {item.isSelected === 0 &&
						    <div className='quantity'>
						    	<button>
						    		<FontAwesomeIcon icon={faChevronLeft} onClick={() => handleQuantityDecrease(index)} />
						    	</button>
						    	<span> {item.quantity} </span>
						    	<button>
						    		<FontAwesomeIcon icon={faChevronRight} onClick={() => handleQuantityIncrease(index)} />
						    	</button>
						    </div>
                        }
					</div>
				))}
			</div>
			{/* <div className='total'>Total: {totalItemCount}</div> */}
		</div>
	);
}

export default Market;