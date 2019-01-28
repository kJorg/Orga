//setup connection lines---------------------------------------------------

function DrawLines(tree, branchOffset){
    
    let root = tree.getChildByName('CEO');
    let branches = tree.getChildByName('Branches');
    
    let startPointX = root.x + root.width/2;
    let startPointY = root.height;
    let intersectionPoint;
    
    for (let i = 0; i < branches.children.length; i++){
        let element = branches.getChildAt(i);
        intersectionPoint = (startPointY + element.y) * 0.5;
        let elementHorizontalMid = element.x + branchOffset + element.width* 0.5;
        let line = new PIXI.Graphics()
            .moveTo(elementHorizontalMid, element.y)
            .lineStyle(2, 0x000000, 2)
            .lineTo(elementHorizontalMid, intersectionPoint)
            .lineTo(startPointX, intersectionPoint);
       
    let lineFromRoot = new PIXI.Graphics()
        .moveTo(startPointX, startPointY)
        .lineStyle(2, 0x000000, 2)
        .lineTo(startPointX, intersectionPoint);
   
    tree.addChild(lineFromRoot, line);

    }
}