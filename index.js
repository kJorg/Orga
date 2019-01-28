const log = console.log;

let app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    transparent: true,
    antialias: true    
    });

document.body.appendChild(app.view);

let contentViewer = new PIXI.Container();

    let contentViewerBg = new PIXI.Graphics()
        .beginFill(0xe6f7ff)
        .drawRect(0, 0, app.view.width, app.view.height);


    contentViewer.addChild(contentViewerBg);

app.stage.addChild(contentViewer);

let tree = CreateTree(root, heads);

tree.y = 0;// to do, hardcoded  for now(if needed)

contentViewer.addChild(tree);