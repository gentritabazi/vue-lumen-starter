<?php

namespace App\Exceptions;

use Throwable;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Laravel\Lumen\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\HttpExceptionInterface;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that should not be reported.
     *
     * @var array
     */
    protected $dontReport = [
        AuthorizationException::class,
        HttpException::class,
        ModelNotFoundException::class,
        ValidationException::class,
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Throwable  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Throwable  $exception
     * @return \Illuminate\Http\Response|\Illuminate\Http\JsonResponse
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        return $this->renderException($request, $exception);
    }

    /**
     * Render an exception into an HTTP response.
     */
    public function renderException($request, $e)
    {
        $status = 500;

        if ($e instanceof HttpExceptionInterface) {
            $status = $e->getStatusCode();
        }

        switch ($status) {
            case 401:
                $message = strlen($e->getMessage()) ? $e->getMessage() : 'Unauthorized.';
                break;
            case 403:
                $message = strlen($e->getMessage()) ? $e->getMessage() : 'Forbidden.';
                break;
            case 404:
                $message = strlen($e->getMessage()) ? $e->getMessage() : 'Not Found.';
                break;
            case 405:
                $message = strlen($e->getMessage()) ? $e->getMessage() : 'Method Not Allowed.';
                break;
            case 500:
                $message = (app()->environment('production')) ? 'Whoops, looks like something went wrong.' : $e->getMessage();
                break;
            case 503:
                $message = 'The server is currently unable to handle the request due to a temporary overloading or maintenance of the server.';
                break;
            default:
                $message = $e->getMessage();
                break;
        }

        $data = [
            'success' => false,
            'status' => $status,
            'message' => $message
        ];

        if (!app()->environment('production')) {
            $data['exception'] = (string)$e;
            $data['line'] = $e->getLine();
            $data['file'] = $e->getFile();
        }

        return response()->json($data, $status);
    }
}
