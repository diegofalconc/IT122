let movies = [
    { movie: "The Last Emperor", director: "Bernardo Bertolucci", year: "1987", theme: "Drama"},
    { movie: "The Godfather", director: "Francis Ford Coppola", year: "1972", theme: "Drama"},
    { movie: "Godzilla vs Kong", director: "Adam Wingard", year: "2021", theme: "Action"},
    { movie: "Star Wars: A new Hope", director: "George Lucas", year: "1977", theme: "Fantasy"},
    { movie: "Titanic", director: "James Cameron", year: "1997", theme: "Drama"},

]

function getAll(){

    return movies;
}

function getItem(val){
    return movies.find((item) => {
        return item.title.toLowerCase() === title.toLoverCase();
    });
}

function addItem(newItem){
    let repeated = false;
    movies.forEach(function(item, index, object){
        if (item.movie === newItem.movie){
            repeated = true;
        }
    });
    if(!repeated){
        movies.push(newItem);
        console.log("Data Added Succesfully");
        return newItem;
    } else {
        console.log("Data is repeated");
    }
}

function deleteItem(Item){
    let deleted = false;
    movies.forEach(function(item, index, object){
        if (item.movie === Item.movie){
            object.splice(index,1);
            console.log("Data deleted Succesfully");
            deleted = true;
        }
    });
    if(!deleted){
        console.log("Data isn't present in the database");
        return deleted;
    }else {
        
        return deleted;
    }
}


export { movies, getAll, getItem, addItem, deleteItem };