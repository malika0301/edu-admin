let path = new URLSearchParams(location.search);
let id = path.get("teacherId");
let teacherStudents = document.getElementById("single-students");

async function getData() {
    try {
        let res = await axios.get(`https://6921f0ae512fb4140be1d12d.mockapi.io/teachers/${id}`);
        console.log(res.data);

        let res2 = await axios.get(`https://6921f0ae512fb4140be1d12d.mockapi.io/teachers/${id}/students`);
        res2.data.map((el) => {
            teacherStudents.innerHTML += `<a href="../pages/single-students.html?studentId=${el.id}" class="p-[15px] w-full bg-gray-300 rounded-[20px]">
        <div class="flex items-center justify-between gap-[10px]">
              <div class="flex items-center gap-[7px]">
               <img class="w-[70px] h-[70px] object-cover rounded-[50%] border border-blue-200 border-[5px]" src=${el.avatar} alt="">
                  <div><h1>${el.name}</h1>
                   <div class="flex items-center gap-[5px]">
                  <p class="text-[gray]">${el.age} years</p>  <p class="text-[gray]">Grade-${el.grade}</p> </div>
                  </div> 
                 
               </div>
              <div class="flex gap-[5px] items-center"><p>${el.rating}</p><img class="w-[20px] h-[20px] object-cover rounded-[50px]" src="../img/star (1).svg345.jpg" alt=""></div>
        </div>
            </a>`
        });
        console.log(res2);

    } catch (err) {
        console.log(err);

    }
};

getData();
