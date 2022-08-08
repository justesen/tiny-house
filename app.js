angular.module("tinyHouseApp", ["ngSanitize"])
  .controller("TinyHouseController", function ($scope) {
    const m = {};
    m.treeThick = 45;
    m.wallWidth = 120;
    m.width = 2300+4*m.treeThick;
    m.length = 5900;
    m.height = 2400;
    m.padding = 100;

    const range = (size, startAt = 0) => [...Array(size).keys()].map(i => i + startAt);
    $scope.max = Math.max;

    const aboveWindow = (w) => m.height - 2*m.treeThick - w.fromFloor - w.height
    const belowWindow = (w) => w.fromFloor - 2*m.treeThick
    const yBelowWindow = (w) => m.height - w.fromFloor + m.treeThick;

    const topWindow = (w, x) => ({
      width: 2*600 - m.treeThick, height: m.treeThick,
      x: x, y: m.height - w.fromFloor - w.height - m.treeThick,
      class: "wood-120"
    });
    const bottomWindow = (w, x) => ({
      width: 2*600 - m.treeThick, height: m.treeThick,
      x: x, y: m.height - w.fromFloor,
      class: "wood-120"
    });
    const leftWindow = (w, x) => ({
      width: m.treeThick, height: w.height,
      x: x + (1200 - w.width)/2 - m.treeThick, y: yBelowWindow(w) - w.height - m.treeThick,
      class: "wood-120"
    });
    const rightWindow = (w, x) => ({
      width: m.treeThick, height: w.height,
      x: leftWindow(w, x).x + w.width + m.treeThick, y: yBelowWindow(w) - w.height - m.treeThick,
      class: "wood-120"
    })

    m.floor = [
      {
        width: m.length, height: m.treeThick,
        x: 0, y: 0,
        class: "wood-295"
      },
      {
        width: m.length, height: m.treeThick,
        x: 0, y: m.treeThick,
        class: "wood-295"
      },
      {
        width: m.length, height: m.treeThick,
        x: 0, y: m.width - 2*m.treeThick,
        class: "wood-295"
      },
      {
        width: m.length, height: m.treeThick,
        x: 0, y: m.width - m.treeThick,
        class: "wood-295"
      },
      {
        width: m.length-2*m.treeThick, height: m.treeThick,
        x: m.treeThick, y: 2*m.treeThick,
        class: "wood-120"
      },
      {
        width: m.length-2*m.treeThick, height: m.treeThick,
        x: m.treeThick, y: m.width-3*m.treeThick,
        class: "wood-120"
      }
    ].concat([
      {
        width: m.treeThick, height: m.width - 4*m.treeThick,
        x: 0*600, y: 2*m.treeThick,
        class: "wood-295"
      }
    ].concat(range(9, 1).map(i => ({
        width: m.treeThick, height: m.width - 4*m.treeThick,
        x: i*600, y: 2*m.treeThick,
        class: "wood-120"
      })))
    ).concat([
      {
        width: m.treeThick, height: m.width - 4*m.treeThick,
        x: m.length - m.treeThick, y: 2*m.treeThick,
        class: "wood-295"
      }
    ]);

    m.roof = range(10, 0).map(i => ({
      width: m.treeThick, height: m.width,
      x: i*600, y: 0,
      class: "wood-195"
    })).concat([{
      width: m.treeThick, height: m.width,
      x: m.length - m.treeThick, y: 0,
      class: "wood-195"
    }]);

    m.westWallWindow = {
      width: 1100,
      height: 600,
      fromFloor: 1400,
    }

    m.westWall = [
      { // Top
        width: m.width - 2*m.wallWidth, height: m.treeThick,
        x: 0, y: 0,
        class: "wood-120"
      },
      { // Bund
        width: m.width - 2*m.wallWidth, height: m.treeThick,
        x: 0, y: m.height - m.treeThick,
        class: "wood-120"
      },
      { // Venstre regal
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 0, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 2
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 600, y: m.treeThick,
        class: "wood-120"
      },
      topWindow(m.westWallWindow, 600 + m.treeThick),
      bottomWindow(m.westWallWindow, 600 + m.treeThick),
      leftWindow(m.westWallWindow, 600 + m.treeThick),
      { // Regal 3 (over vindue)
        width: m.treeThick, height: aboveWindow(m.westWallWindow),
        x: 600*2, y: m.treeThick,
        class: "wood-120"
      },
      {  // Regal 3 (under vindue)
        width: m.treeThick, height: belowWindow(m.westWallWindow),
        x: 600*2, y: yBelowWindow(m.westWallWindow),
        class: "wood-120"
      },
      { // Regal 4
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 600*3, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 5
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.width - 2*m.wallWidth - m.treeThick, y: m.treeThick,
        class: "wood-120"
      },
    ];

    m.eastWallWindow = {
      width: 500,
      height: 900,
      fromFloor: 1300,
    }

    m.eastWall = [
      { // Top
        width: m.width - 2*m.wallWidth, height: m.treeThick,
        x: 0, y: 0,
        class: "wood-120"
      },
      { // Bund
        width: m.width - 2*m.wallWidth, height: m.treeThick,
        x: 0, y: m.height - m.treeThick,
        class: "wood-120"
      },
      { // Venstre regal
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 0, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 2
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 3 (over vindue)
        width: m.treeThick, height: aboveWindow(m.eastWallWindow),
        x: 600*2, y: m.treeThick,
        class: "wood-120"
      },
      {  // Regal 3 (under vindue)
        width: m.treeThick, height: belowWindow(m.eastWallWindow),
        x: 600*2, y: yBelowWindow(m.eastWallWindow),
        class: "wood-120"
      },
      topWindow(m.eastWallWindow, 600 + m. treeThick),
      bottomWindow(m.eastWallWindow, 600 + m. treeThick),
      leftWindow(m.eastWallWindow, 600 + m. treeThick),
      rightWindow(m.eastWallWindow, 600 + m. treeThick),
      { // Regal 4
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 600*3, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 5
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.width - 2*m.wallWidth - m.treeThick, y: m.treeThick,
        class: "wood-120"
      },
    ];

    m.door = {
      width: 910,
      height: 2130,
    }

    m.southWindow = {
      width: 900,
      height: 900,
      fromFloor: 900
    }

    m.southWall = [
      { // Top
        width: m.length, height: m.treeThick,
        x: 0, y: 0,
        class: "wood-120"
      },
      { // Bund
        width: m.length, height: m.treeThick,
        x: 0, y: m.height - m.treeThick,
        class: "wood-120"
      },
      { // Regal 1
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 0, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 2 (til inderbeklædning)
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 3
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth + 600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 4
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth + 2*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 5
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 1800, y: m.treeThick,
        class: "wood-120"
      },
      { // Over dør
        width: m.door.width, height: m.treeThick,
        x: 1800 + m.treeThick, y: m.height - m.treeThick*2 - m.door.height,
        class: "wood-120"
      },
      { // Regal 6
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 1800 + m.door.width + m.treeThick, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 7 (over vindue)
        width: m.treeThick, height: aboveWindow(m.southWindow),
        x: 1800 + m.door.width + m.treeThick + 600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 7 (under vindue)
        width: m.treeThick, height: belowWindow(m.southWindow),
        x: 1800 + m.door.width + m.treeThick + 600, y: yBelowWindow(m.southWindow),
        class: "wood-120"
      },
      topWindow(m.southWindow, 1800 + m.door.width + 2*m.treeThick),
      bottomWindow(m.southWindow, 1800 + m.door.width + 2*m.treeThick),
      leftWindow(m.southWindow, 1800 + m.door.width + 2*m.treeThick),
      // rightWindow(m.southWindow, 1800 + m.door.width + 2*m.treeThick),
      { // Regal 8
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 1800 + m.door.width + m.treeThick + 2*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 9
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 1800 + m.door.width + m.treeThick + 3*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 10
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 1800 + m.door.width + m.treeThick + 4*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 11
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 1800 + m.door.width + m.treeThick + 5*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 12
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.length - m.treeThick, y: m.treeThick,
        class: "wood-120"
      },
    ]

    m.northWindow = {
      width: 900,
      height: 1100,
      fromFloor: 800
    }

    m.kitchenWindow = {
      width: 900,
      height: 700,
      fromFloor: 1100
    }

    m.northWall = [
      { // Top
        width: m.length, height: m.treeThick,
        x: 0, y: 0,
        class: "wood-120"
      },
      { // Bund
        width: m.length, height: m.treeThick,
        x: 0, y: m.height - m.treeThick,
        class: "wood-120"
      },
      { // Regal 1
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: 0, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 2 (til inderbeklædning)
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 3
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth + 600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 4
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth + 2*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 5
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth + 3*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 6
        width: m.treeThick, height: aboveWindow(m.northWindow),
        x: m.wallWidth + 4*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 6
        width: m.treeThick, height: belowWindow(m.northWindow),
        x: m.wallWidth + 4*600, y: yBelowWindow(m.northWindow),
        class: "wood-120"
      },
      topWindow(m.northWindow, m.wallWidth + 3*600 + m.treeThick),
      bottomWindow(m.northWindow, m.wallWidth + 3*600 + m.treeThick),
      leftWindow(m.northWindow, m.wallWidth + 3*600 + m.treeThick),
      // rightWindow(m.northWindow, m.wallWidth + 3*600 + m.treeThick),
      { // Regal 7
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.wallWidth + 5*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 8
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.length - m.treeThick - m.wallWidth - 4*600, y: m.treeThick,
        class: "wood-120"
      },
      topWindow(m.kitchenWindow, m.length - m.treeThick - m.wallWidth - 4*600 + m.treeThick),
      bottomWindow(m.kitchenWindow, m.length - m.treeThick - m.wallWidth - 4*600 + m.treeThick),
      Object.assign(leftWindow(m.kitchenWindow, m.length - m.treeThick - m.wallWidth - 4*600 + m.treeThick), {x: 3590}),
      { // Regal 9
        width: m.treeThick, height: aboveWindow(m.kitchenWindow),
        x: m.length - m.treeThick - m.wallWidth - 3*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 9
        width: m.treeThick, height: belowWindow(m.kitchenWindow),
        x: m.length - m.treeThick - m.wallWidth - 3*600, y: yBelowWindow(m.kitchenWindow),
        class: "wood-120"
      },
      { // Regal 10
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.length - m.treeThick - m.wallWidth - 2*600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 11
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.length - m.treeThick - m.wallWidth - 600, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 12
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.length - m.treeThick - m.wallWidth, y: m.treeThick,
        class: "wood-120"
      },
      { // Regal 13
        width: m.treeThick, height: m.height - 2*m.treeThick,
        x: m.length - m.treeThick, y: m.treeThick,
        class: "wood-120"
      },
    ]

    $scope.m = m;
  });
