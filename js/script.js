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
    div.classList = `btn bg-gray-200 active:bg-red-500 `;

    div.innerHTML = `
        <p>${category.category}</p>
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
  
    if(result == ''){
        noDataPage();
    }else{
        const errorPage = document.getElementById('error')
        errorPage.textContent='';
    }

  // timeCalculator(result)

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  

  result.forEach((detail) => {
    const div = document.createElement("div");
    let timeConvert = timeCalculator(detail);

    div.classList = `card w-[400px] bg-base-100 p-5 mx-auto`;

    div.innerHTML = `
        <div class="relative">
        <img class=" h-[200px] w-[375px]" src="${detail.thumbnail}" />
        <p class="showTime absolute text-[10px] bottom-3 bg-[#171717] text-white p-1 right-3 ">${
          timeConvert.hours
        }hrs ${timeConvert.minutes} min ago</p>
        </div>
        <div class="flex gap-3 mt-5">
        <img class="w-10 h-10 rounded-full " src="${
          detail.authors[0].profile_picture
        }" />
        <div class="grid gap-2 text-sm font-medium">
        <h1 class="text-lg font-bold">${detail.title}</h1>

            <p class="text-[#171717B2]">${detail.authors[0].profile_name} ${
      detail.authors[0]?.verified
        ? '<img class="inline" src="./image/verification.png" alt"verification image"/>'
        : ""
    }
            
            <p class="text-[#171717B2]">${detail.others.views} Views</p>
            
        </div>
        
        </div>
        `;

        

    cardContainer.appendChild(div);
  });
};

loadCategoryDetails();

const timeCalculator = (result) => {
  // console.log(result, "inside calculator")

  let seconds = result.others?.posted_date;
  let hour = Math.floor(seconds / 3600);
  let minute = Math.floor((seconds % 3600) / 60);

  const timeResult = {
    hours: hour,
    minutes: minute,
  };
  // console.log(timeResult)
  return timeResult;
};


const noDataPage = () =>{
    const errorPage = document.getElementById('error');
    const cardContainer = document.getElementById('card-container')
    cardContainer.textContent= "";
    errorPage.textContent="";
    console.log("Working on nodatapage")
    const div = document.createElement('div');
    div.innerHTML=`
    <div class="h-[50vh] flex flex-col justify-center items-center gap-8" >
    <img src="./image/Icon.png" alt="">
    <h1 class="text-center text-3xl font-bold">Oops!! Sorry, There is no <br>content here</h1>
    </div>
    `
    errorPage.appendChild(div)
    // noDataPageCounter= true;
    // return loadCategory();
}

// global function to stop noDataPage Repeat
// const noDataPageCounter = false;