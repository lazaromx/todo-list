export class LocalBase{
    constructor(collectionName){
        console.log("ArmazemLocal criado"); 
        this.collectionName = collectionName;   
    }

    getItems(){
        return JSON.parse(localStorage.getItem(this.collectionName) || "[]");
    }

    addItem(item){
        const items = this.getItems();
        items.push(item);
        localStorage.setItem(this.collectionName, JSON.stringify(items));

        return item;
    }

    deleteItem(itemLabel){
        const items = this.getItems();
        const itemsIndex = items.findIndex((p) => p.label === itemLabel);
		if (itemsIndex !== -1) {
			items.splice(itemsIndex, 1);
			localStorage.setItem(this.collectionName, JSON.stringify(items))
			return true;
		}
		return false;
    }

    editTodo(){
        
    }

    filterTodo(){
        
    }
}

// module.exports = LocalBase