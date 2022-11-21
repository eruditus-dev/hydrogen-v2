import {
  type ActionFunction,
  type AppLoadContext,
  redirect,
} from '@shopify/hydrogen-remix';
import {LoaderArgs} from '@remix-run/server-runtime';

export async function logout(
  context: AppLoadContext,
  params: LoaderArgs['params'],
) {
  const {session} = context;
  session.unset('customerAccessToken');

  return redirect(
    params.lang ? `${params.lang}/account/login` : '/account/login',
    {
      headers: {
        'Set-Cookie': await session.commit(),
      },
    },
  );
}

export async function loader({params}: LoaderArgs) {
  return redirect(params.lang ? `${params.lang}/` : '/');
}

export const action: ActionFunction = async ({context, params}) => {
  return logout(context, params);
};