let teacherCards = document.getElementById("teacher-cards");
let form = document.getElementById("form");
let outerModal = document.getElementById("crud-modal");
async function getData(content) {
    try {
        let res = await axios.get(
            "https://6921f0ae512fb4140be1d12d.mockapi.io/teachers"
        );
        console.log(res.data);
        content.innerHTML = "";
        res.data.map((el) => {
            content.innerHTML += `
             <div class=" max-w-[450px] w-full p-[20px] rounded-[20px] shadow-[blue] shadow-xl">
             <div class="flex justify-center">
                <img class="w-[100px] h-[100px] object-cover rounded-[50%] mb-[15px] border border-blue-200 border-[5px]" src=${el.avatar} alt=""></div>
                
                
                <div class="grid justify-center gap-[7px] text-center">
                    <h1>${el.name}</h1>
                    <h2 class="text-[12px] bg-gray-200 rounded-[20px] text-center font-bold ">${el.profession}</h2>
                    <div class="flex gap-[20px] text-gray-700">
                   <div class="flex"><svg class="w-5 h-5 transition duration-75"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
                        </svg><p> ${el.age}y</p></div>
                    <div class="flex"><svg class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                            aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    <p>${el.experience}y</p></div>
                    </div>
                    <div class="flex justify-center">
       <img class="h-5 w-5" src="../img/star (1).svg345.jpg" alt=""> <p>
         ${el.raiting}</p></div>
                    <div class="mt-[10px] text-gray-700 gap-[3px]">
                    <div class="flex justify-center gap-[2px] items-center">
                    <img class="h-5 w-7" src="../img/pp.jpg" alt="">
                    <p>${el.number}</p>
                     </div>
                     <div class="flex justify-center gap-[2px] items-center">
                    <img class="h-5 w-5" src="../img/ee.jpg" alt="">
                    <p>${el.email}</p>
                    </div>
                    <div class="flex justify-center gap-[2px] items-center">
                    <img class="h-5 w-5" src="../img/tt.jpg" alt="">
                    <p>${el.username}</p>
                    </div>
                    <div class="flex justify-center gap-[2px] items-center">
                    <img class="h-5 w-7" src="../img/pp.jpg" alt="">
                    <p>${el.linkedin}</p>
                    </div>
                    </div>
                </div>
                <div class="flex gap-[20px] justify-center mt-[10px]">
                    <button
                        class="py-[5px] px-[10px] bg-[white]  hover:bg-[grey]/50 text-black font-bold rounded-[10px] transition duration">Edit</button>
                    <button onClick="deleteT(${el.id})"
                        class="py-[5px] px-[10px] bg-[white]  hover:bg-[grey]/50 text-[red] font-bold rounded-[10px] transition duration">Delete</button>
                </div>
            </div>`;
        });

    } catch (err) {
    }
}
getData(teacherCards);

async function addTeacher(teacherObj) {
    try {
        await axios.post("https://6921f0ae512fb4140be1d12d.mockapi.io/teachers", teacherObj, outerModal.classList.add("hidden"));
        getData(teacherCards);
    } catch (err) {
        console.log(err);

    }

}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let teacherObj = {};
    teacherObj.name = form[0].value;
    teacherObj.age = form[1].value;
    teacherObj.avatar = form[2].value;
    teacherObj.experience = form[3].value;
    teacherObj.profession = form[4].value;
    teacherObj.number = form[5].value;
    teacherObj.email = form[6].value;
    teacherObj.username = form[7].value;
    teacherObj.linkedin = form[8].value;
    teacherObj.raiting = form[9].value;
    teacherObj.gender = form[10].checked;

    addTeacher(teacherObj);

});

async function deleteT(id) {
    try {
        await axios.delete(`https://6921f0ae512fb4140be1d12d.mockapi.io/teachers/${id}`)
        getData(teacherCards);
    } catch (err) {
        console.log(err);

    }

}