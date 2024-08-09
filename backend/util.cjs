// Inicia la cola de impresión como un array vacío
const printQueue = [];
let isPrinting = false;

const enqueuePrintJob = (job) => {
  printQueue.push(job);
  processPrintQueue();
};

const processPrintQueue = async () => {
  if (isPrinting || printQueue.length === 0) return;

  isPrinting = true;
  const job = printQueue.shift(); // Retira el primer trabajo de la cola
  if (job) {
    try {
      await job();
    } catch (error) {
      console.error("Error al procesar la cola de impresión:", error);
    }
  }
  isPrinting = false;
  processPrintQueue(); // Procesa la siguiente tarea en la cola
};
