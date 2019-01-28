let fullUsersList = [];

for (let i = 0; i < data.length; i++)
{
    
    fullUsersList[i] = new Person(
                    data[i].fullname,
                    data[i].name,
                    data[i].position,
                    data[i].email,
                    data[i].slack,
                    data[i].phone,
                    data[i].skype,
                    data[i].pic,
    );  
}

let root;
let heads = [];
let deputies = [];

for (let i = 0; i < fullUsersList.length; i++) {
    
    if (fullUsersList[i]['position'] == 'CEO'){
        root = fullUsersList[i];
    } 
    else if (fullUsersList[i]['position'].slice(0, 4) === 'Head') {
        heads.push(fullUsersList[i]);
    }
    else if (fullUsersList[i]['position'].slice(0, 6) === 'Deputy') {
        deputies.push(fullUsersList[i]);
    }
    
}