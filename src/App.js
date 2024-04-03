import Header from "./Header";
import SearchItem from "./SearchItem";
import AddItem from "./AddItem";
import Content from "./Content";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import apiRequest from "./apiRequest";

function App() {
    const API_URL = "http://localhost:3500/items";

    // Loads empty array if shopping list is empty
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");
    const [search, setSearch] = useState("");
    const [fetchError, setFetchError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw Error("Did not receive expected data");
                const listItems = await response.json();
                setItems(listItems);
                setFetchError(null);
            } catch (err) {
                setFetchError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        // SETTIMEOUT FOR TESTING ONLY; simulates a server response
        setTimeout(() => {
            (async () => await fetchItems())();
        }, 2000);
    }, []);

    const addItem = async (item) => {
        // const id = items.length ? items[items.length - 1].id + 1 : 1;
        const id = items.length ? parseInt(items[items.length - 1].id) + 1 : 1;
        const myNewItem = { id, checked: false, item };
        const listItems = [...items, myNewItem];
        setItems(listItems);
        // Create item for DB
        const postOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(myNewItem),
        };
        const result = await apiRequest(API_URL, postOptions);
        if (result) setFetchError(result);
    };

    const handleCheck = async (id) => {
        // console.log(`key: ${id}`);
        const listItems = items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item));
        setItems(listItems);
        // gets the checked item
        const myItem = listItems.filter((item) => item.id === id);
        // Update item for DB
        const updateOptions = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ checked: myItem[0].checked }),
        };
        const requestUrl = `${API_URL}/${id}`;
        const result = await apiRequest(requestUrl, updateOptions);
        if (result) setFetchError(result);
    };

    const handleDelete = async (id) => {
        // console.log(id);
        const listItems = items.filter((item) => item.id !== id);
        setItems(listItems);

        // Delete item for DB
        const deleteOptions = { method: "DELETE" };
        const requestUrl = `${API_URL}/${id}`;
        const result = await apiRequest(requestUrl, deleteOptions);
        if (result) setFetchError(result);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newItem) return;
        // console.log(newItem);
        addItem(newItem);
        setNewItem("");
    };

    return (
        <div className="App">
            <Header title="Grocery List" />
            <AddItem
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleSubmit}
            />
            <SearchItem
                search={search}
                setSearch={setSearch}
            />
            <main>
                {isLoading && <p>Loading Items...</p>}
                {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
                {!fetchError && !isLoading && (
                    <Content
                        items={items.filter((item) => item.item.toLowerCase().includes(search.toLowerCase()))}
                        handleCheck={handleCheck}
                        handleDelete={handleDelete}
                    />
                )}
            </main>
            <Footer length={items.length} />
        </div>
    );
}

export default App;

// Chapt 15
