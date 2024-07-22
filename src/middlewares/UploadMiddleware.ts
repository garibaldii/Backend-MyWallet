import multer from 'multer';

// Configuração de armazenamento em memória
// Define o armazenamento para que os arquivos sejam armazenados em memória como buffers
const storage = multer.memoryStorage();

// Cria uma instância do multer com a configuração de armazenamento definida
const upload = multer({ storage });

// Exporta a instância do multer para ser utilizada em outras partes da aplicação
export default upload;