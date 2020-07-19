import { Router, Request, Response } from "express";
import Server from '../classes/server';

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
 
    const payload = {
		by,
		body,
	};

	const server = Server.instance;

	server.io.emit("new-message", payload);
   
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

    const payload = {
        by,
        body
    }

    const server = Server.instance;

    server.io.in(id).emit('private-message', payload);

	res.json({
		ok: true,
		body,
        by,
        id
	});
});


export default router;
