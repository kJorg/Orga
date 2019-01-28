////grid helper-------------------------------------------------------------------------
let nlines = heads.length;


let gridButton = new PIXI.Graphics()
    .beginFill(0xcc0000)
    .drawCircle(40, 100 , 20);

gridButton.interactive = true;

gridButton.click = () =>
{
    SwitchGrid(grid);
}

contentViewer.addChild(gridButton);

let grid = BuildGrid();

function BuildGrid(){
    
    let container = new PIXI.Container();
    
    for (let i = 1; i <= nlines; i++){
        let vlinex = app.view.width/nlines;
        let vline = new PIXI.Graphics()

            .moveTo(vlinex * i, 0)
            .lineStyle(1, 0xcc0000, 2)
            .lineTo(vlinex * i, app.view.height);
        container.addChild(vline);
    }


    let hline = new PIXI.Graphics()
        .moveTo(0, app.view.height/2)
        .lineStyle(1, 0xcc0000, 2)
        .lineTo(app.view.width, app.view.height/2);
    container.addChild(hline);
    
    return container;
}

grid.visible = false;
contentViewer.addChild(grid);

function SwitchGrid(grid){
    grid.visible = !grid.visible; 
}
//-------------------------------------------------------------------------------------