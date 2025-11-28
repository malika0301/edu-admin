let studentCards = document.getElementById("student-cards");
let form = document.getElementById("form");
let outerModal = document.getElementById("crud-modal");
let addStudents = document.getElementById("add-students-btn");
let selected = null;
let pagination = document.getElementById("pagination")
let page = 1;
let sotrName = document.getElementById("sort");
let sortNameValue = "default";

sotrName.addEventListener("change", function (e) {
    sortNameValue = e.target.value;
    page = 1;
    getData(studentCards, page, sortNameValue)
});

addStudents.addEventListener("click", function () {
    for (let el of form) {
        el.value = "";
        el.checked = false;
    }
});
function changePage(i) {
    getData(studentCards, i , sortNameValue);
};

async function getData(content, page, sortNameValue) {
    try {
        let res = await axios.get(
            `https://6921f0ae512fb4140be1d12d.mockapi.io/students?page=${page}&limit=10&${sortNameValue === "default" ? "" : `sortBy=name&order=${sortNameValue}`}`
        );
        let allRes = await axios.get(
            "https://6921f0ae512fb4140be1d12d.mockapi.io/students"
        );
        let pages = Math.ceil(allRes.data.length / 10);

        pagination.innerHTML = "";
        pagination.innerHTML += `
        <li onClick="changePage(${page - 1})" class="${page === 1 ? "hidden" : ""} cursor-pointer border border-gray-500 p-[7px] rounded-[10px] font-bold">
                Previous
            </li>`;


        pagination.innerHTML += `<li>${page}/${pages}</li>`;
        pagination.innerHTML += `<li onClick="changePage(${page + 1})" class="${page === pages ? "hidden" : ""} cursor-pointer border border-gray-500 p-[7px] rounded-[10px] font-bold">
                Next
            </li>`
        content.innerHTML = "";
        res.data.map((el) => {
            content.innerHTML += `
             <div class=" max-w-[450px] w-full p-[20px] rounded-[20px] shadow-[blue] shadow-sm">
             <div class="flex justify-center">
                <a href="../pages/single-students.html?studentId=${el.id}">
                <img class="w-[100px] h-[100px] object-cover rounded-[50%] mb-[15px] border border-blue-200 border-[5px]" src=${el.avatar} alt=""></div>
                </a>
                
                <div class="grid justify-center items-center gap-[7px] text-center">
                    <h1>${el.name}</h1>
                    
                    <div class="flex justify-center gap-[5px]">
                    <h2 class="text-[12px] bg-gray-200 rounded-[20px] p-[5px] text-center font-bold ">Grade-${el.grade}</h2>
                     <div class="flex justify-center items-center"><svg class="w-5 h-5 transition duration-75"
                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                            viewBox="0 0 24 24">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
                        </svg><p> ${el.age}y</p></div></div>
                    </div>
            <div>
            <div class="mb-[15px]"><div class="flex gap-[20px] text-gray-700">
                    <div class="w-full h-[4px] rounded-[50px] bg-[red]">
                        <div style="width: ${el.rating}%" class="h-[4px] rounded-[50px] bg-[blue]"></div>
                           <div class="flex justify-between items-center mt-[5px]">
                            <div class="flex justify-center items-center">
                               <img class="h-5 w-5" src="../img/star (1).svg345.jpg" alt=""> <p>
                                 ${el.rating}</p>
                            </div>

                            <div class="flex"><svg class="shrink-0 w-5 h-5 transition duration-75 group-hover:text-fg-brand"
                               aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                               viewBox="0 0 24 24">
                               <path stroke="currentColor" stroke-linecap="round" stroke-width="2"
                                d="M16 19h4a1 1 0 0 0 1-1v-1a3 3 0 0 0-3-3h-2m-2.236-4a3 3 0 1 0 0-4M3 18v-1a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1Zm8-10a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                   </svg>
                                <p>${el.coins}y</p>
                            </div></div>
                        </div>
                    </div></div>
                
                     
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
                    <p>${el.user}</p>
                    </div>
                    <div class="flex justify-center gap-[2px] items-center">
                    <img class="h-4 w-6" src="../img/ll.png" alt="">
                    <p>${el.lin}</p>
                    </div>
                    </div>
                </div>
                <div class="flex gap-[20px] justify-center mt-[10px]">
                    <button onClick="editS(${el.id})"
                        class="py-[5px] px-[10px] bg-[white]  hover:bg-[grey]/50 text-black font-bold rounded-[10px] transition duration">Edit</button>
                    <button onClick="deleteS(${el.teacherId}, ${el.id})"
                        class="py-[5px] px-[10px] bg-[white]  hover:bg-[grey]/50 text-[red] font-bold rounded-[10px] transition duration">Delete</button>
                </div>
            </div>`;
        });

    } catch (err) {
        console.log(err);

    }
}
getData(studentCards, page);

async function editS(id) {
    outerModal.classList.remove("hidden");
    outerModal.classList.add("flex");
    outerModal.classList.add("justify-center");
    selected = id;
    try {
        let res = await axios.get(
            `https://6921f0ae512fb4140be1d12d.mockapi.io/students/${id}`);

        form[0].value = res.data.name;
        form[1].value = res.data.age;
        form[2].value = res.data.avatar;
        form[3].value = res.data.coins;
        form[4].value = res.data.grade;
        form[5].value = res.data.number;
        form[6].value = res.data.email;
        form[7].value = res.data.user;
        form[8].value = res.data.lin;
        form[9].value = res.data.rating;
        form[10].checked = res.data.gender;
    } catch (err) {
        console.log(err);
    }
}
outerModal.addEventListener("click", (e) => {
    if (e.target === outerModal) {
        outerModal.classList.add("hidden");
    }
});


async function addStudent(studentObj) {
    try {

        if (selected) {
            await axios.put(
                `https://6921f0ae512fb4140be1d12d.mockapi.io/students/${selected}`, studentObj);
        } else {
            await axios.post("https://6921f0ae512fb4140be1d12d.mockapi.io/students", studentObj);
        }
        selected = null;
        getData(studentCards, page);

    } catch (err) {
        console.log(err);

    }
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    let studentObj = {};
    studentObj.name = form[0].value;
    studentObj.age = form[1].value;
    studentObj.avatar = form[2].value;
    studentObj.coins = form[3].value;
    studentObj.grade = form[4].value;
    studentObj.number = form[5].value;
    studentObj.email = form[6].value;
    studentObj.user = form[7].value;
    studentObj.lin = form[8].value;
    studentObj.rating = form[9].value;
    studentObj.gender = form[10].checked;

    addStudent(studentObj);
    selected = null;

});

async function deleteS(tId, sId) {
    try {
        await axios.delete(`https://6921f0ae512fb4140be1d12d.mockapi.io/teachers/${tId}/students/${sId}`)
        getData(studentCards, page);
    } catch (err) {
        console.log(err);

    }

}