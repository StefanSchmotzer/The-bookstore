const xmlns = 'xmls="http://www.w3.org/2000.svg"';
const viewBox = ' viewBox="0 -960 960 960"';
const svg = '';
const pathBookIcon = 'path d="M270-80q-45 0-77.5-30.5T160-186v-558q0-38 23.5-68t61.5-38l395-78v640l-379 76q-9 2-15 9.5t-6 16.5q0 11 9 18.5t21 7.5h450v-640h80v720H270Zm90-233 200-39v-478l-200 39v478Zm-80 16v-478l-15 3q-11 2-18 9.5t-7 18.5v457q5-2 10.5-3.5T261-293l19-4Zm-40-472v482-482Z"'
const pathLikeIcon = 'path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"'
const pathSubmitIcon = 'path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z"'

function getBookCard(indexBook, bookTitle, imagePath, price, gender, author, published, genre, likes) {
  return `
    <section class="BookCard">
      <h2>${bookTitle}</h2>

      
      <img class="BookIcon" src="${books.imagePath}">
        
      

      <div class="ChildContainerBookCard">
        <div class="ContainerPriceLikes">
          <span class="Price">${price}</span>
          <div id="#LikeContainer_${indexBook}" 
            class="ContainerLikes">
              </div>
        </div>
        <table>
          <tr>
            <td>${gender}:</td>
            <td>${author}</td>
          </tr>
          <tr>
            <td>Erscheinungsjahr:</td>
            <td>${published}</td>
          </tr>
          <tr>
            <td>Genre:</td>
            <td>${genre}</td>
          </tr>
        </table>
      </div>

      <div class="ChildContainerBookCard">
        <h3>Kommentare:</h3>
        <p id="#DefaultText_${indexBook}"
          class="DefaultText">
        </p>
        <table id="#Comments_${indexBook}">
        </table>
        <div class="ContainerInput">
          <input id="#NameInput_${indexBook}"
            class="InputName" 
            type="text" 
            placeholder="Name (optional)">
          <input id="#CommentInput_${indexBook}"
            class="InputComment" 
            type="text" 
            placeholder="dein Kommentar ..." 
            required>
          <button onclick="addComment(${indexBook})" type="submit">
            <svg class="SubmitIcon"
              ${xmlns}
              ${viewBox}>
              <${pathSubmitIcon}/>
            </svg>
          </button>
        </div>
      </div>
    </section>`;
}

function getLikeInformation(indexBook, likes) {
  return `
    <span id="#LikeCount_${indexBook}">
      ${likes}
    </span>
    <button onclick="toggleLike(${indexBook})" name="like">
      <svg id="#LikeSymbol_${indexBook}" 
        class="LikeIcon"
        ${xmlns}
        ${viewBox}>
        <${pathLikeIcon}/>
      </svg>
    </button>`
}

function getComments(commentName, comment) {
  return `
    <tr>
      <td>${commentName}:</td>
      <td>${comment}</td>
    </tr>`
}

function getDefaultText() {
  return `Schreibe den ersten Kommentar.`
}