(() => {
  const gamePath = "./assets/supper-tramper-vi.swf";
  const playerElement = document.getElementById("player");
  const statusElement = document.getElementById("status");

  function showStatus(message) {
    statusElement.textContent = message;
  }

  async function startGame() {
    try {
      const response = await fetch(gamePath, { cache: "no-store" });
      if (!response.ok) {
        showStatus("Không tìm thấy hoặc không tải được assets/supper-tramper.swf.");
        return;
      }

      const game = await response.blob();
      if (game.size === 0) {
        showStatus("Tệp assets/supper-tramper.swf rỗng; không thể khởi chạy game.");
        return;
      }

      const ruffle = window.RufflePlayer?.newest();
      if (!ruffle) {
        showStatus(
          "Không tải được Ruffle từ CDN. Hãy kiểm tra kết nối mạng rồi tải lại trang."
        );
        return;
      }

      const gamePlayer = ruffle.createPlayer();
      playerElement.replaceChildren(gamePlayer);
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
