import { ref, onMounted, onUnmounted } from "vue";

export function useIsMobile() {
  const isMobile = ref(window.innerWidth <= 1000);

  const checkMobile = () => {
    isMobile.value = window.innerWidth <= 1000;
  };

  onMounted(() => {
    window.addEventListener("resize", checkMobile);
  });

  onUnmounted(() => {
    window.removeEventListener("resize", checkMobile);
  });

  return {
    isMobile,
  };
}
