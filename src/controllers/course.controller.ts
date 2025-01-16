import { Response, Request, NextFunction } from "express";
import { CourseServiceImpl } from "../service/implementation/course-service.implementation";
import { CreateCourseDTO } from "../dto/createCourse.dto";

export class CourseContoller {
    private courseService : CourseServiceImpl;

    constructor(){
        this.courseService = new CourseServiceImpl();
    }

    public createCourse = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try{
            const courseData = req.body as CreateCourseDTO;
            const newUser = await this.courseService.createCourse(courseData);
            res.status(201).json(newUser);
        }catch (error){
            next(error);
        }
    }
}