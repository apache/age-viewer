import {Router} from "express";
import {wrap} from "../common/Routes";
import FeatureController from "../controllers/FeatureController";
import multer from "multer";

const upload = multer({storage: multer.memoryStorage()});

const featureController = new FeatureController();

const router = Router();
router.post("/uploadCSV", upload.single('file'), wrap(featureController.uploadCSV));

export default router;
