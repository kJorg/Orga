
function SetDepartmentScreen(dept){
    
    let departmentPage = new PIXI.Container();
    departmentPage.name = dept;
        
    let header = SetHeader(dept);
    
    departmentPage.addChild(header)
    
    let backbutton = SetBackButton(departmentPage);
    
    SetElementPosition(backbutton, header, 20, 'y');
    
    header.addChild(backbutton); 
    
    ComposeDepartmentScreen(dept, departmentPage, header);
            
    contentViewer.addChild(departmentPage);
    
}

function ComposeDepartmentScreen(departmentToShow, container, header){
    
    let head = SetDepartmentManagers(departmentToShow, heads);
        
    let deputy = SetDepartmentManagers(departmentToShow, deputies);
    
    
    
    if (deputy != undefined){
        
        DeptManagersPositon(header, head, deputy);
        
        container.addChild(head, deputy);
        
    } else {
        
        DeptManagersPositon(header, head);
        
        container.addChild(head);
   
    }
        //to do
    //let teams = SetDepartmentTeams(department);
    //container.addChild(head, deputy);
   // SetToMid(container, contentViewer);
    
}

function DeptManagersPositon(header, manager1, manager2) {
   
    manager1.y = header.height + 5;
    
    if (manager2 != undefined){
       
        manager2.y = manager1.y;
        manager2.x = manager1.width + 5;
   }
}

function SetDepartmentManagers(departmentName, arr){
                
    let manager = arr.find(function(Person) {
        if (Person.position.includes(departmentName)) {
            return Person;
        }
    });
    
    if (manager != undefined){
        let item = new PIXI.Container();
        item = SetupItem(manager, 250, 250, 14);
        return item; 
    }
}

function SetHeader(dept){
    let headerBarContainer = new PIXI.Container();
    
    let headerBg = new PIXI.Graphics()
        .beginFill(0x000033)
        .drawRect(0, 0, app.stage.width, 50);
    headerBarContainer.addChild(headerBg);
    
    let headerText = new PIXI.Text(dept, {
        fontFamily: 'SquareFont',
        fill: 0xffffff,
        fontSize: 32
    });
    
    SetElementPosition(headerText, headerBg, 'x', 'y');
    
    headerBarContainer.addChild(headerText);
    
    return headerBarContainer;
}

function SetBackButton(dept){
    let backButton = new PIXI.Container();
    
    let text = new PIXI.Text('Back', {
        fontFamily: 'SquareFont',
        fill: 0xffffff,
    });
    
    let backBg = new PIXI.Graphics()
        .beginFill(0x000077)
        .lineStyle(2, 0xffffff, 2)
        .drawRect(0, 0, text.width + 10, text.height);
    
    SetElementPosition(text, backBg, 'x');
   
    backButton.addChild(backBg, text);
    
    backButton.interactive = true;
    backButton.click = () => {
        tree.visible = true;
        contentViewer.removeChild(dept);
    }
    
    return backButton;
    
}

