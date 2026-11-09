(() => {
  const gamePath = "./assets/supper-tramper-vi.swf";
  const playerElement = document.getElementById("player");
  const statusElement = document.getElementById("status");

  function showStatus(message) {
    statusElement.textContent = message;
    statusElement.hidden = false;
  }

  async function startGame() {
    try {
      const response = await fetch(gamePath, { cache: "no-store" });
      if (!response.ok) {
        showStatus("Không tìm thấy hoặc không tải được tệp game.");
        return;
      }

      const game = await response.blob();
      if (game.size === 0) {
        showStatus("Tệp game rỗng; không thể khởi chạy.");
        return;
      }

      const ruffle = window.RufflePlayer?.newest();
      if (!ruffle) {
        showStatus("Không tải được game. Hãy kiểm tra kết nối mạng rồi tải lại trang.");
        return;
      }

      const gamePlayer = ruffle.createPlayer();
      playerElement.append(gamePlayer);
      await gamePlayer.load(gamePath);
    } catch (error) {
      showStatus(
        "Không thể tải game. Hãy kiểm tra máy chủ HTTP, kết nối mạng và tệp SWF. " +
          "Chi tiết: " +
          (error instanceof Error ? error.message : String(error))
      );
    }
  }

  startGame();
})();
