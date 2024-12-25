"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRoutes = void 0;
const express_1 = __importDefault(require("express"));
const quiz_validation_1 = require("./quiz.validation");
const quiz_controller_1 = require("./quiz.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post('/create', (0, validateRequest_1.default)(quiz_validation_1.QuizValidation.questionSchema), quiz_controller_1.QuizController.createQuiz);
router.get('/:quizId', quiz_controller_1.QuizController.getQuizByQuizId);
router.get('/getQuiz/:id', quiz_controller_1.QuizController.getQuizById);
router.patch('/update/:id', quiz_controller_1.QuizController.updateQuiz);
router.delete('/delete/:id', quiz_controller_1.QuizController.deleteQuiz);
router.get('/', quiz_controller_1.QuizController.fetchAllQuizzes);
exports.QuizRoutes = router;
