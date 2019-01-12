// Add your hotkeys and combinations here
// Keyboard.bind for single press combinations
// Keyboard.bindRepeatable for repeatable combinations
// Hotkeys obey player.options.hotkeys option
// Keyboard.bindHotkey for single press hotkeys
// Keyboard.bindRepeatableHotkey for repeatable hotkeys
// Keyboard class uses Mousetrap under the hood, so for more details visit
// https://craig.is/killing/mice

Keyboard.bindRepeatableHotkey("m", () => maxAll());
Keyboard.bindRepeatableHotkey("d", () => softResetBtnClick());
Keyboard.bindRepeatableHotkey("g", () => galaxyResetBtnClick());
Keyboard.bindRepeatableHotkey("s", () => sacrificeBtnClick());
Keyboard.bindRepeatableHotkey("r", () => replicantiGalaxy());
Keyboard.bindRepeatableHotkey("t", () => buyMaxTickSpeed());
Keyboard.bindRepeatableHotkey("shift+t", () => buyTickSpeed());
Keyboard.bindRepeatableHotkey("c", () => bigCrunchReset());
Keyboard.bindRepeatableHotkey("e", () => eternity());

for (let i = 1; i < 9; i++) {
  Keyboard.bindRepeatableHotkey(`${i}`, () => buyManyDimension(i));
  Keyboard.bindRepeatableHotkey(`shift+${i}`, () => buyOneDimension(i));
}

Keyboard.bindHotkey("a", () => toggleAutobuyers());
Keyboard.bindHotkey("esc", () => {
  if (Modal.isOpen()) {
    Modal.hide();
  }
  else {
    Tab.options.show();
  }
});
Keyboard.bindHotkey("w", () => pauseWormhole());

Keyboard.bind("shift", () => setShiftKey(true), "keydown");
Keyboard.bind("shift", () => setShiftKey(false), "keyup");

Keyboard.bind(["ctrl", "command"], () => setControlKey(true), "keydown");
Keyboard.bind(["ctrl", "command"], () => setControlKey(false), "keyup");

Keyboard.bind(["ctrl+shift", "command+shift"], () => setControlShiftKey(true), "keydown");

Keyboard.bind("9", () => giveAchievement("That dimension doesn’t exist"));

Keyboard.bind(["ctrl+shift+c", "ctrl+shift+i", "ctrl+shift+j", "f12"], () => {
  giveAchievement("Stop right there criminal scum!")
});

Keyboard.bind("up up down down left right left right b a", () => {
  giveAchievement("30 Lives");
  if (player.money.lt(30)) {
    player.money = new Decimal(30);
  }
});

Keyboard.bindRepeatable("f", () => {
  ui.notify.info("Paying respects");
  giveAchievement("It pays to have respect");
});
