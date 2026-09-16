const allBooksData= [];
const allLikeData= {"likes":[], "liked":[]};
const allComments = {};

function init() {
    getStaticBooksDataFromBackend();
    renderStaticBookCards();

    getVariableBooksDataFromBackend(); 
    getLikeDataAndCommentsFromLocalStorage();
    renderAllVariableBooksData();
}

function getStaticBooksDataFromBackend() {
    for (let indexBook = 0; indexBook < books.length; indexBook++) {
        const bookData = [];

        bookData.bookTitle = books[indexBook].name;
        bookData.price = books[indexBook].price.toFixed(2).toString().replace(".", ",") + " €";
        bookData.gender = (books[indexBook].gender == "female") ? "Autorin" : "Autor"; 
        bookData.author = books[indexBook].author;
        bookData.published = books[indexBook].publishedYear;
        bookData.genre = books[indexBook].genre;

        allBooksData.push(bookData);
    }
}

function renderStaticBookCards() {
    const bookCardsRef = document.getElementById('#BookCards');
    for (let indexBook = 0; indexBook < allBooksData.length; indexBook++) {
        bookCardsRef.innerHTML += getBookCard(
            indexBook, 
            allBooksData[indexBook].bookTitle, 
            allBooksData[indexBook].price, 
            allBooksData[indexBook].gender, 
            allBooksData[indexBook].author, 
            allBooksData[indexBook].published, 
            allBooksData[indexBook].genre);
    }
}

function getVariableBooksDataFromBackend() {
    getLikeDataFromBackend();
    getBooksCommentsFromBackend(); 
}

function getLikeDataFromBackend() {
    for (let indexBook = 0; indexBook < books.length; indexBook++) {
        allLikeData.likes.push(books[indexBook].likes);
        allLikeData.liked.push(books[indexBook].liked);
    }
}

function getBooksCommentsFromBackend() {
    for (let indexBook = 0; indexBook < books.length; indexBook++) {
        const namesKey = indexBook + "_commentsNames";
        const commentsKey = indexBook + "_comments";
        namesArray = [];
        commentsArray = [];

        for (let indexComment = 0; indexComment < books[indexBook].comments.length; indexComment++) {
            namesArray.push(books[indexBook].comments[indexComment].name);
            commentsArray.push(books[indexBook].comments[indexComment].comment); 
        }
        allComments[namesKey] = namesArray;
        allComments[commentsKey] = commentsArray;
    }
}

function getLikeDataAndCommentsFromLocalStorage() {
    getLikeDataFromLocalStorage();
    getCommentsFromLocalStorage();
}

function getLikeDataFromLocalStorage() {
    const localLikes = JSON.parse(localStorage.getItem("likes"));
    const localLiked = JSON.parse(localStorage.getItem("liked"));

    if (localLikes != null) {
        allLikeData.likes = localLikes;
        allLikeData.liked = localLiked;
    }
}

function getCommentsFromLocalStorage() {
    for (let indexBook = 0; indexBook < allBooksData.length; indexBook++) {
        const localCommentsNames = JSON.parse(localStorage.getItem(indexBook + "_commentsNames"));
        const localComments = JSON.parse(localStorage.getItem(indexBook + "_comments"));

        if (localComments != null) {
            allComments[indexBook + "_commentsNames"] = localCommentsNames;
            allComments[indexBook + "_comments"] = localComments;
        }
    } 
}

function renderAllVariableBooksData() {
    for (let indexBook = 0; indexBook < allBooksData.length; indexBook++) {
        renderLike(indexBook);
        isLiked(indexBook);
        renderComments(indexBook);
    }
}

function renderLike(indexBook) {
    const likesRef = document.getElementById('#LikeContainer_' + indexBook);
    const likes = allLikeData.likes[indexBook];
    likesRef.innerHTML = getLikeInformation(indexBook, likes);
}

function isLiked(indexBook) {
    const likedRef = document.getElementById('#LikeSymbol_' + indexBook);
    allLikeData.liked[indexBook] ? likedRef.classList.add("Liked") : likedRef.classList.remove("Liked");
}

function renderComments(indexBook) {
    const defaultRef = document.getElementById('#DefaultText_' + indexBook);
    defaultRef.innerHTML = "";
    const commentsRef = document.getElementById('#Comments_' + indexBook);
    commentsRef.innerHTML = "";
    const commentsNames = allComments[indexBook + "_commentsNames"];
    const comments = allComments[indexBook + "_comments"];

    if (comments.length > 0) {  
        for (let indexComment = 0; indexComment < comments.length; indexComment++) {
            const commentName = commentsNames[indexComment];
            const comment = comments[indexComment];
            commentsRef.innerHTML += getComments(commentName, comment);
        }
    } else {
        defaultRef.innerHTML = getDefaultText();
    }
}

function toggleLike(indexBook) {
    if (allLikeData.liked[indexBook]) {
        allLikeData.liked[indexBook] = false;
        allLikeData.likes[indexBook] -= 1;
    } else {
        allLikeData.liked[indexBook] = true
        allLikeData.likes[indexBook] += 1;
    };
    renderAndSaveToggledLike(indexBook)
}

function renderAndSaveToggledLike(indexBook) {
    renderLike(indexBook);
    isLiked(indexBook);
    localStorage.setItem("likes", JSON.stringify(allLikeData.likes));
    localStorage.setItem("liked", JSON.stringify(allLikeData.liked));
}

function addComment(indexBook) {
    const nameInputRef = document.getElementById('#NameInput_' + indexBook);
    const commentInputRef = document.getElementById('#CommentInput_' + indexBook);
    const namesKey = indexBook + "_commentsNames";
    const commentsKey = indexBook + "_comments";

    if(commentInputRef.value != "") {
        nameInputRef.value != "" ? allComments[namesKey].push(nameInputRef.value) : allComments[namesKey].push("Anonym");
        allComments[commentsKey].push(commentInputRef.value);
    }

    renderAndSaveAddedComment(indexBook, namesKey, commentsKey);
    nameInputRef.value = "";
    commentInputRef.value = "";
}

function renderAndSaveAddedComment(indexBook, namesKey, commentsKey) {
    renderComments(indexBook);
    localStorage.setItem(namesKey, JSON.stringify(allComments[namesKey]));
    localStorage.setItem(commentsKey, JSON.stringify(allComments[commentsKey]));
}