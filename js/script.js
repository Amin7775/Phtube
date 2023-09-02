console.log("connected");

const loadCategory = async () => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/categories`
  );
  const data = await res.json();
  const details = data.data;
//   console.log(details);
  createButtons(details);
};

loadCategory();

// dynamic btn
const createButtons = (details) => {
  const btnContainer = document.getElementById("btn-container");
  btnContainer.textContent = "";

  details.forEach((category) => {
    const div = document.createElement("div");
    div.classList = `btn bg-gray-200`;

    div.innerHTML = `
        <p>${category.category}</p>
        <p>${category.category_id}</p>
      `;
    // console.log(category.category, "clicked")
    div.id = `${category.category_id}`;
    div.onclick = () => loadCategoryDetails(div.id); //call function
    // console.log(div.id);
    btnContainer.appendChild(div);
  });
};

const loadCategoryDetails = async (id = "1000") => {
//   console.log(id, "load");
  const res = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await res.json();

  const categoryDetails = data.data;
  const result = categoryDetails;

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";

  result.forEach((detail) => {
    const div = document.createElement("div");

    
    div.classList = `card w-[400px] bg-base-100 border-2 border-gray-200 p-5 mx-auto`;

    div.innerHTML = `
        <img class=" h-[200px] w-[375px]" src="${detail.thumbnail}" />
        <div class="flex gap-3 mt-5">
        <img class="w-10 h-10 rounded-full " src="${detail.authors[0].profile_picture}" />
        <div class="grid gap-2 text-sm font-medium">
        <h1 class="text-lg font-bold">${detail.title}</h1>

            <p class="text-[#171717B2]">${detail.authors[0].profile_name} ${detail.authors[0]?.verified ? '<img class="inline" src="./image/verification.png" alt"verification image"/>' : ''}
            
            <p class="text-[#171717B2]">${detail.others.views} Views</p>
            
        </div>
        
        </div>
        `;

    cardContainer.appendChild(div);
  });
};

loadCategoryDetails();