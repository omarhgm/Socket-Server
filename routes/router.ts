import { Router, Request, Response } from "express";

const router = Router();

router.get('/messages', (req: Request, res: Response) => { 
    res.json({
        ok: true,
        menssage: 'Todo esta bien'
    })
})

router.post('/messages', (req: Request, res: Response) => { 
    const body = req.body.cuerpo;
    const by = req.body.de;
   
    res.json({
        ok: true,
        body,
        by
    })
})

router.post("/messages/:id", (req: Request, res: Response) => {
	const body = req.body.cuerpo;
	const by = req.body.de;
    const id = req.params.id;

	res.json({
		ok: true,
		body,
        by,
        id
	});
});


export default router;
