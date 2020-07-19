import { Router, Request, Response } from "express";
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usersOnline } from '../sockets/sockets';

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

router.get('/users', (req: Request, resp: Response) => {
    const server = Server.instance;

    server.io.clients((err: any, clients: string[]) => {
        if (err) {
            return resp.json({
                ok: false,
                err
            });
        }

        resp.json({
            ok: true,
            clients
        });
    });
});

router.get('/users/info', (req: Request, resp: Response) => {
    resp.json({
        ok: true,
        clients: usersOnline.getList()
    });
});

export default router;
